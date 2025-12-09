import AutoTransformer from "../model/AutoTransformer.js"
import multer from "multer"
import path from "path"
import fs from "fs"
import PDFDocument from "pdfkit"
import puppeteer from "puppeteer-core"
import { generateHTMLTemplate } from "../utils/pdfTemplateGenerator.js"

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // save into /uploads folder
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
})

const upload = multer({ storage })

// Function to format labels
function formatLabel(raw) {
  if (raw === undefined || raw === null) return ""
  let s = String(raw)
  s = s.replace(/[_-]+/g, " ")
  s = s.replace(/([a-z])([A-Z])/g, "$1 $2")
  s = s.replace(/([A-Za-z])(\d)/g, "$1 $2").replace(/(\d)([A-Za-z])/g, "$1 $2")
  s = s.replace(/\s+/g, " ").trim()
  const lower = s.toLowerCase()
  if (lower === "srno" || lower === "sr no") return "Sr No"
  const ACRONYMS = /^(id|kv|kva|kvah|kvar|dc|ac)$/i
  return s
    .split(" ")
    .map((w) => (ACRONYMS.test(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ")
}

export const getStageTableData = async (req, res) => {
  try {
    const { projectName, companyName, stage } = req.body;
    
    if (!projectName || !companyName || !stage) {
      return res.status(400).json({ 
        message: "Project name, company name, and stage are required." 
      });
    }

    const queryPath = `autoTransformerData.stage${stage}`;
    const document = await AutoTransformer.findOne(
      { projectName, companyName },
      { [queryPath]: 1, projectName: 1, companyName: 1 },
    ).lean();

    if (!document) {
      return res.status(404).json({ message: "Project document not found." });
    }

    const getNestedObject = (obj, path) => {
      return path.split(".").reduce((acc, part) => acc && acc[part], obj)
    }
    const nestedData = getNestedObject(document, queryPath)
    if (!nestedData) {
      return res.status(404).json({
        message: `Data for stage ${stage} not found.`,
      })
    }
    // 🔹 Build base URL dynamically
    const baseUrl = `${req.protocol}://${req.get("host")}`

    // 🔹 Recursively convert any "photos" map values to full URLs
    const convertPhotoPathsToUrls = (data) => {
      if (!data || typeof data !== "object") return data

      if (data.photos && typeof data.photos === "object") {
        const newPhotos = {}
        for (const [key, value] of Object.entries(data.photos)) {
          if (typeof value === "string") {
            // Only prepend baseUrl if the value doesn't already start with http/https
            if (value.startsWith("http://") || value.startsWith("https://")) {
              newPhotos[key] = value; // Use the URL as-is
            } else {
              newPhotos[key] = `${baseUrl}/${value}`;
            }
          } else if (Array.isArray(value)) {
            newPhotos[key] = value.map((v) => {
              if (typeof v === "string") {
                if (v.startsWith("http://") || v.startsWith("https://")) {
                  return v; // Use the URL as-is
                } else {
                  return `${baseUrl}/${v}`;
                }
              }
              return v;
            });
          }
        }
        data.photos = newPhotos
      }

      // also check nested sub-objects
      for (const [k, v] of Object.entries(data)) {
        if (v && typeof v === "object") {
          data[k] = convertPhotoPathsToUrls(v)
        }
      }

      return data
    }

    const responseData = convertPhotoPathsToUrls(nestedData)

    res.status(200).json({
      message: `Data for stage ${stage} retrieved successfully`,
      data: responseData,
    })
  } catch (error) {
    console.error("Error retrieving stage table data:", error.message);
    res.status(500).json({
      message: "Failed to retrieve form data",
      error: error.message,
    });
  }
}

export const getTableData = async (req, res) => {
  try {
    const { projectName, companyName, stage, formNumber } = req.body;
    
    if (!projectName || !companyName || !stage || !formNumber) {
      return res.status(400).json({ 
        message: "Project name, company name, stage, and form number are required." 
      });
    }

    const queryPath = `autoTransformerData.stage${stage}.form${formNumber}`;
    const document = await AutoTransformer.findOne({ projectName, companyName }, { [queryPath]: 1 }).lean();

    if (!document) {
      return res.status(404).json({ message: "Project document not found." });
    }

    const getNestedObject = (obj, path) => {
      return path.split(".").reduce((acc, part) => acc && acc[part], obj)
    }
    const nestedData = getNestedObject(document, queryPath)
    if (!nestedData) {
      return res.status(404).json({
        message: `Data for stage ${stage}, form ${formNumber} not found.`,
      })
    }

    res.status(200).json({
      message: `Data for stage ${stage}, form ${formNumber} retrieved successfully`,
      data: nestedData,
    })
  } catch (error) {
    console.error("Error retrieving table data:", error.message);
    res.status(500).json({
      message: "Failed to retrieve form data",
      error: error.message,
    });
  }
}

export const getCompleteTableData = async (req, res) => {
  try {
    const { projectName, companyName } = req.body;

    if (!projectName || !companyName) {
      return res.status(400).json({ 
        message: "Project name and company name are required." 
      });
    }

    const document = await AutoTransformer.findOne({
      projectName,
      companyName,
    }).lean();

    if (!document) {
      return res.status(404).json({
        message: "Project document not found.",
      });
    }

    // Send the retrieved data back to the client.
    res.status(200).json({
      message: `Data for stage ${projectName}, form ${companyName} retrieved successfully`,
      data: document,
    })
  } catch (error) {
    console.error("Error retrieving complete table data:", error.message);
    res.status(500).json({
      message: "Failed to retrieve form data",
      error: error.message,
    });
  }
}

export const setTableData = async (req, res) => {
  try {
    const { projectName, companyName, formNumber, stage } = req.body;

    if (!projectName || !companyName || !formNumber || !stage) {
      return res.status(400).json({ 
        message: "Project name, company name, form number, and stage are required." 
      });
    }

    const parsedData = {};

    // ✅ parse all body fields
    for (const [key, value] of Object.entries(req.body)) {
      if (["projectName", "companyName", "stage", "formNumber"].includes(key)) {
        parsedData[key] = value
      } else {
        if (typeof value === "string") {
          try {
            const parsed = JSON.parse(value)
            parsedData[key] = parsed
          } catch {
            parsedData[key] = value
          }
        } else {
          parsedData[key] = value
        }
      }
    }

    // ✅ process uploaded photos
    const photos = {}
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const match = file.fieldname.match(/photos\[(.+)\]/)
        if (match) {
          const key = match[1]
          photos[key] = `uploads/${file.filename}`
        }
      })
    }

    if (Object.keys(photos).length > 0) {
      parsedData.photos = {
        ...(parsedData.photos || {}),
        ...photos,
      }
    }

    // ✅ Save into Mongo
    const updatedForm = await AutoTransformer.findOneAndUpdate(
      { projectName, companyName },
      {
        $set: {
          [`autoTransformerData.stage${stage}.form${formNumber}`]: parsedData,
        },
      },
      { new: true, upsert: true, runValidators: true },
    )

    res.status(201).json({
      message: "Form data saved successfully",
      data: updatedForm,
    })
  } catch (error) {
    console.error("Error saving form data:", error.message);
    res.status(500).json({
      message: "Failed to save form data",
      error: error.message,
    });
  }
}

export const generatePDF = async (req, res) => {
  try {
    console.log("=== PDF Generation Request received ===");
    
    // Try different possible field names
    const projectName = req.body.projectName || req.body.ProjectName || req.body.project_name;
    const companyName = req.body.companyName || req.body.CompanyName || req.body.company_name;

    console.log("Extracted values:");
    console.log("  projectName:", projectName);
    console.log("  companyName:", companyName);

    if (!projectName || !companyName) {
      console.error("❌ Missing required fields!");
      console.error("  projectName:", projectName);
      console.error("  companyName:", companyName);
      console.error("  Available keys in body:", Object.keys(req.body));
      console.error("  Full body:", req.body);
      return res.status(400).json({ 
        message: "Project name and company name are required.",
        received: { projectName, companyName },
        availableKeys: Object.keys(req.body),
        fullBody: req.body
      });
    }

    console.log(`Generating PDF for project: ${projectName}, company: ${companyName}`);

    // Fetch complete data from MongoDB
    console.log("Fetching data from MongoDB...");
    const completeData = await AutoTransformer.findOne({
      projectName,
      companyName,
    }).lean();

    if (!completeData) {
      console.error("No data found in MongoDB for:", { projectName, companyName });
      return res.status(404).json({
        message: "Project data not found.",
        searchedFor: { projectName, companyName }
      });
    }

    console.log("Data fetched successfully from MongoDB");

    // Generate HTML with exact UI styling
    console.log("Generating HTML template...");
    const html = generateHTMLTemplate(completeData, projectName, companyName);
    console.log("HTML template generated successfully");

    // Launch Puppeteer with enhanced configuration for Render.com
    console.log("Launching Puppeteer browser...");
    
    // Determine the correct executable path based on environment
    let executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
    let launchOptions = {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-extensions',
        '--disable-web-security',
        '--no-first-run',
        '--disable-features=VizDisplayCompositor',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--disable-ipc-flooding-protection',
        '--disable-background-networking',
        '--disable-default-apps',
        '--disable-sync',
        '--disable-translate',
        '--hide-scrollbars',
        '--metrics-recording-only',
        '--mute-audio',
        '--no-default-browser-check',
        '--no-pings',
        '--password-store=basic',
        '--use-mock-keychain',
        '--disable-blink-features=AutomationControlled'
      ],
      timeout: 60000,
      ignoreDefaultArgs: ['--disable-extensions'],
      handleSIGINT: false,
      handleSIGTERM: false,
      handleSIGHUP: false
    };

    // Check if we're running on Render or similar cloud platform
    if (process.env.RENDER || process.env.NODE_ENV === 'production') {
      console.log("Detected cloud environment, prioritizing system Chrome");
      
      // Try system Chrome paths first (more reliable)
      const systemPaths = [
        '/usr/bin/google-chrome-stable',
        '/usr/bin/google-chrome',
        '/usr/bin/chromium-browser',
        '/usr/bin/chromium',
        '/opt/google/chrome/chrome',
        '/snap/bin/chromium',
        '/usr/local/bin/google-chrome-stable',
        '/usr/local/bin/google-chrome'
      ];

      // Check system paths first
      for (const chromePath of systemPaths) {
        if (fs.existsSync(chromePath)) {
          console.log(`Found system Chrome at: ${chromePath}`);
          executablePath = chromePath;
          break;
        }
      }

      // Only try Puppeteer cache if system Chrome not found
      if (!executablePath) {
        console.log("System Chrome not found, checking Puppeteer cache...");
        try {
          const baseDir = '/opt/render/.cache/puppeteer/chrome';
          if (fs.existsSync(baseDir)) {
            const versionDirs = fs.readdirSync(baseDir).filter(dir => dir.startsWith('linux-'));
            if (versionDirs.length > 0) {
              const fullPath = path.join(baseDir, versionDirs[0], 'chrome-linux64', 'chrome');
              if (fs.existsSync(fullPath)) {
                console.log(`Found Puppeteer Chrome at: ${fullPath}`);
                executablePath = fullPath;
              }
            }
          }
        } catch (error) {
          console.log(`Could not check Puppeteer cache: ${error.message}`);
        }
      }

      // Try chrome-aws-lambda as fallback
      if (!executablePath) {
        console.log("No Chrome found, trying chrome-aws-lambda...");
        try {
          const chromium = await import('chrome-aws-lambda');
          executablePath = await chromium.default.executablePath;
          launchOptions.args = [...launchOptions.args, ...chromium.default.args];
          console.log("Using chrome-aws-lambda executable");
        } catch (error) {
          console.log("chrome-aws-lambda not available:", error.message);
        }
      }

      // Last resort: don't set executablePath and let Puppeteer handle it
      if (!executablePath) {
        console.log("No Chrome executable found, letting Puppeteer use default");
        // Don't set executablePath, let Puppeteer try its default
      }
    } else {
      // Local development - try to find Chrome in the project's cache directory
      const cacheDir = path.join(process.cwd(), '.cache', 'puppeteer', 'chrome');
      if (fs.existsSync(cacheDir)) {
        const versionDirs = fs.readdirSync(cacheDir).filter(dir => 
          dir.startsWith('win64-') || dir.startsWith('linux-') || dir.startsWith('mac-')
        );
        if (versionDirs.length > 0) {
          let chromeExePath;
          if (process.platform === 'win32') {
            chromeExePath = path.join(cacheDir, versionDirs[0], 'chrome-win64', 'chrome.exe');
          } else if (process.platform === 'darwin') {
            chromeExePath = path.join(cacheDir, versionDirs[0], 'chrome-mac64', 'Google Chrome for Testing.app', 'Contents', 'MacOS', 'Google Chrome for Testing');
          } else {
            chromeExePath = path.join(cacheDir, versionDirs[0], 'chrome-linux64', 'chrome');
          }
          
          if (fs.existsSync(chromeExePath)) {
            executablePath = chromeExePath;
          }
        }
      }
      
      // For local development, we need to specify an executable path
      // since we're using puppeteer-core
      if (!executablePath) {
        console.log("No Chrome found in local development, you may need to install Chrome");
      }
    }
    
    console.log("Using Chrome executable at:", executablePath);
    
    // Ensure we have a valid executable path for puppeteer-core
    if (!executablePath) {
      const errorMessage = "No Chrome executable found. Please ensure Chrome is installed or set PUPPETEER_EXECUTABLE_PATH environment variable.";
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    
    // Set the executable path in launch options
    launchOptions.executablePath = executablePath;
    
    const browser = await puppeteer.launch(launchOptions);

    const page = await browser.newPage();
    console.log("Browser page created");
    
    // Set content and wait for resources to load
    console.log("Setting HTML content...");
    await page.setContent(html, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    console.log("HTML content loaded");

    // Generate PDF with styling preserved
    console.log("Generating PDF...");
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      },
      preferCSSPageSize: false
    });

    console.log("PDF generated successfully");
    await browser.close();
    console.log("Browser closed");

    // Send PDF to client
    const filename = `${projectName}_complete_report_${new Date().toISOString().split("T")[0]}.pdf`;
    res.setHeader("Content-disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-type", "application/pdf");
    console.log("Sending PDF to client...");
    res.send(pdfBuffer);
    console.log("PDF sent successfully");

  } catch (err) {
    console.error("Error generating PDF:", err);
    console.error("Error stack:", err.stack);
    res.status(500).json({ 
      error: "Failed to generate PDF",
      details: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// Keep the old PDFKit implementation as backup (renamed)
export const generatePDFOld = async (req, res) => {
  try {
    const { projectName, formData } = req.body

    const doc = new PDFDocument({ 
      margin: 40,
      size: 'A4',
      bufferPages: true
    })
    const filename = `${projectName || "project"}_all_stages_${new Date().toISOString().split("T")[0]}.pdf`

    // Response headers
    res.setHeader("Content-disposition", `attachment; filename="${filename}"`)
    res.setHeader("Content-type", "application/pdf")
    doc.pipe(res)

    // Constants matching the HTML/CSS styling
    const pageHeight = doc.page.height
    const pageWidth = doc.page.width
    const margin = 40
    const headerHeight = 60
    const tableWidth = pageWidth - (margin * 2)
    
    // Colors matching the CSS gradient and styling
    const colors = {
      // Gradient blue header (matching linear-gradient(135deg, #4299e1, #3182ce))
      headerGradientStart: '#4299e1',
      headerGradientEnd: '#3182ce',
      headerText: '#FFFFFF',
      // Table styling
      evenRowBg: '#f8fafc', // matching tr:nth-child(even)
      hoverRowBg: '#edf2f7', // matching tr:hover
      border: '#e2e8f0',
      cellText: '#2d3748',
      inputBorder: '#e2e8f0',
      inputFocusBorder: '#4299e1',
      // Section headers
      sectionHeaderBg: '#f7fafc',
      sectionHeaderBorder: '#e2e8f0',
      sectionHeaderText: '#2d3748',
    }

    // Form titles mapping
    const formTitles = {
      stage1: {
        form1: "Name Plate Details Transformer",
        form2: "Protocol for Accessories Checking",
        form3: "Core Insulation Check",
        form4: "Pre-Erection Tan Delta and Capacitance Test on Bushing",
        form5: "Record of Measurement of IR Values"
      },
      stage2: {
        form1: "Record of Oil Handling",
        form2: "IR After Erection"
      },
      stage3: {
        form1: "Before Oil Filling and Pressure Test Report",
        form2: "Record for Oil Filtration - Main Tank",
        form3: "Oil Filtration of Radiator and Combine"
      },
      stage4: {
        form1: "SFRA Test Record",
        form2: "Record of Measurement of IR Values & Voltage Ratio Test",
        form3: "Short Circuit Test",
        form4: "Winding Resistance Test and Record of Measurement of IR & PI Values"
      },
      stage5: {
        form1: "Pre-Charging Check List",
        form2: "Pre-Charging Check List - Part 2"
      },
      stage6: {
        form1: "Work Completion Report"
      }
    }

    // Add cover page
    const addCoverPage = () => {
      try {
        const coverImagePath = path.join(process.cwd(), 'src/FirstPage.jpg')
        if (fs.existsSync(coverImagePath)) {
          doc.image(coverImagePath, 0, 0, {
            fit: [pageWidth, pageHeight],
            align: 'center',
            valign: 'center'
          })
          doc.addPage()
        }
      } catch (error) {
        console.error('Error adding cover page:', error)
      }
    }

    // Add last page
    const addLastPage = () => {
      try {
        const lastPageImagePath = path.join(process.cwd(), 'src/LastPage.jpg')
        if (fs.existsSync(lastPageImagePath)) {
          doc.addPage()
          doc.image(lastPageImagePath, 0, 0, {
            fit: [pageWidth, pageHeight],
            align: 'center',
            valign: 'center'
          })

          if (formData.stage6 && formData.stage6.form1) {
            const stage6Data = formData.stage6.form1
            doc.fillColor('#000000').fontSize(10).font('Helvetica')

            if (stage6Data.customerName) doc.text(stage6Data.customerName, 128, 232, { width: 200 })
            if (stage6Data.orderNumber) doc.text(stage6Data.orderNumber, 122, 245, { width: 150 })
            if (stage6Data.location) doc.text(stage6Data.location, 90, 258, { width: 200 })
            if (stage6Data.type) doc.text(stage6Data.type, 78, 313, { width: 150 })
            if (stage6Data.capacity) doc.text(stage6Data.capacity, 90, 325, { width: 100 })
            if (stage6Data.voltageRating) doc.text(stage6Data.voltageRating, 122, 338, { width: 100 })
            if (stage6Data.make) doc.text(stage6Data.make, 76, 351, { width: 150 })
            if (stage6Data.serialNumber) doc.text(stage6Data.serialNumber, 120, 364, { width: 200 })
            if (stage6Data.completionDate) doc.text(stage6Data.completionDate, 350, 440, { width: 150 })
            if (stage6Data.chargingDate) doc.text(stage6Data.chargingDate, 350, 456, { width: 150 })
            if (stage6Data.commissioningDate) doc.text(stage6Data.commissioningDate, 420, 455, { width: 150 })

            if (stage6Data.signatures) {
              const signatures = stage6Data.signatures
              if (signatures.vpesName) doc.text(signatures.vpesName, 78, 537, { width: 150 })
              if (signatures.vpesDesignation) doc.text(signatures.vpesDesignation, 103, 550, { width: 150 })
              if (signatures.vpesSignature && signatures.vpesSignature.startsWith('data:image/')) {
                try {
                  const base64Data = signatures.vpesSignature.replace(/^data:image\/[a-z]+;base64,/, '')
                  const signatureBuffer = Buffer.from(base64Data, 'base64')
                  doc.image(signatureBuffer, 55, 553, { width: 120, height: 30 })
                } catch (error) {
                  console.error('Error adding VPES signature:', error)
                }
              }
              if (signatures.vpesDate) doc.text(signatures.vpesDate, 73, 576, { width: 150 })
              if (signatures.customerName) doc.text(signatures.customerName, 369, 537, { width: 150 })
              if (signatures.customerDesignation) doc.text(signatures.customerDesignation, 398, 550, { width: 150 })
              if (signatures.customerDate) doc.text(signatures.customerDate, 365, 576, { width: 150 })
              if (signatures.customerSignature && signatures.customerSignature.startsWith('data:image/')) {
                try {
                  const base64Data = signatures.customerSignature.replace(/^data:image\/[a-z]+;base64,/, '')
                  const signatureBuffer = Buffer.from(base64Data, 'base64')
                  doc.image(signatureBuffer, 355, 547, { width: 120, height: 30 })
                } catch (error) {
                  console.error('Error adding customer signature:', error)
                }
              }
            }
          }
        }
      } catch (error) {
        console.error('Error adding last page:', error)
      }
    }

    let isFirstPage = true

    // Add header image to pages
    const addHeaderImage = () => {
      if (isFirstPage) {
        isFirstPage = false
        return margin
      }
      
      try {
        const headerImagePath = path.join(process.cwd(), 'src/Header.jpg')
        if (fs.existsSync(headerImagePath)) {
          doc.image(headerImagePath, margin, 10, {
            width: pageWidth - (margin * 2),
            height: headerHeight - 20
          })
          return margin + headerHeight
        }
      } catch (error) {
        console.error('Error adding header image:', error)
      }
      return margin
    }

    // Draw gradient header (simulating CSS linear-gradient)
    const drawGradientHeader = (x, y, width, height) => {
      // Create gradient effect with multiple rectangles
      const steps = 20
      for (let i = 0; i < steps; i++) {
        const ratio = i / steps
        // Interpolate between start and end colors
        const r = Math.round(66 + (49 - 66) * ratio)
        const g = Math.round(153 + (130 - 153) * ratio)
        const b = Math.round(225 + (206 - 225) * ratio)
        const color = `rgb(${r}, ${g}, ${b})`
        
        doc.rect(x, y + (height / steps) * i, width, height / steps)
           .fillColor(color)
           .fill()
      }
    }

    // Draw form title header (matching company-header style)
    const drawFormTitleHeader = (title, y) => {
      const headerHeight = 60
      if (y + headerHeight > pageHeight - margin) {
        doc.addPage()
        y = addHeaderImage()
      }

      // Background with gradient effect (matching linear-gradient(135deg, #f7fafc, #edf2f7))
      doc.rect(margin, y, tableWidth, headerHeight)
         .fillAndStroke('#f7fafc', colors.sectionHeaderBorder)
         .lineWidth(2)

      // Title text (matching h2 style)
      doc.font('Helvetica-Bold')
         .fontSize(14)
         .fillColor(colors.sectionHeaderText)
         .text(title.toUpperCase(), margin + 10, y + 20, {
           width: tableWidth - 20,
           align: 'center'
         })

      return y + headerHeight + 15
    }

    // Draw table with HTML/CSS styling
    const drawStyledTable = (headers, rows, startY) => {
      let y = startY
      const cellPadding = 12
      const rowHeight = 35
      const colWidth = tableWidth / headers.length

      // Check if we need a new page
      if (y + rowHeight * 2 > pageHeight - margin) {
        doc.addPage()
        y = addHeaderImage()
      }

      // Draw header row with gradient (matching .form-table th)
      drawGradientHeader(margin, y, tableWidth, rowHeight)
      
      // Header borders
      doc.strokeColor(colors.border).lineWidth(1)
      for (let i = 0; i < headers.length; i++) {
        const x = margin + (i * colWidth)
        doc.rect(x, y, colWidth, rowHeight).stroke()
      }

      // Header text
      doc.font('Helvetica-Bold')
         .fontSize(9)
         .fillColor(colors.headerText)
      
      headers.forEach((header, i) => {
        const x = margin + (i * colWidth)
        doc.text(header, x + cellPadding, y + cellPadding, {
          width: colWidth - (cellPadding * 2),
          align: 'center'
        })
      })

      y += rowHeight

      // Draw data rows (matching .form-table tr styling)
      rows.forEach((row, rowIndex) => {
        // Check for page break
        if (y + rowHeight > pageHeight - margin) {
          doc.addPage()
          y = addHeaderImage()
          
          // Redraw header on new page
          drawGradientHeader(margin, y, tableWidth, rowHeight)
          doc.strokeColor(colors.border).lineWidth(1)
          for (let i = 0; i < headers.length; i++) {
            const x = margin + (i * colWidth)
            doc.rect(x, y, colWidth, rowHeight).stroke()
          }
          doc.font('Helvetica-Bold').fontSize(9).fillColor(colors.headerText)
          headers.forEach((header, i) => {
            const x = margin + (i * colWidth)
            doc.text(header, x + cellPadding, y + cellPadding, {
              width: colWidth - (cellPadding * 2),
              align: 'center'
            })
          })
          y += rowHeight
        }

        // Alternating row colors (matching tr:nth-child(even))
        if (rowIndex % 2 === 1) {
          doc.rect(margin, y, tableWidth, rowHeight)
             .fillColor(colors.evenRowBg)
             .fill()
        }

        // Draw cell borders
        doc.strokeColor(colors.border).lineWidth(1)
        for (let i = 0; i < row.length; i++) {
          const x = margin + (i * colWidth)
          doc.rect(x, y, colWidth, rowHeight).stroke()
        }

        // Cell text
        doc.font('Helvetica')
           .fontSize(9)
           .fillColor(colors.cellText)
        
        row.forEach((cell, i) => {
          const x = margin + (i * colWidth)
          const cellText = cell !== undefined && cell !== null ? String(cell) : ''
          doc.text(cellText, x + cellPadding, y + (rowHeight / 2) - 5, {
            width: colWidth - (cellPadding * 2),
            align: 'center',
            lineBreak: false,
            ellipsis: true
          })
        })

        y += rowHeight
      })

      return y + 10
    }

    // Process and render tables from form data
    const renderFormData = (data, startY) => {
      let y = startY

      // Check if data is a table-like structure
      if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
        // Extract headers from first object
        const headers = Object.keys(data[0]).map(key => formatLabel(key))
        const rows = data.map(item => Object.values(item))
        y = drawStyledTable(headers, rows, y)
      } else if (typeof data === 'object' && data !== null) {
        // Check if it's a simple key-value object that should be rendered as a table
        const entries = Object.entries(data).filter(([key, value]) => 
          key !== 'photos' && typeof value !== 'object'
        )
        
        if (entries.length > 0) {
          const headers = ['Field', 'Value']
          const rows = entries.map(([key, value]) => [
            formatLabel(key),
            value !== undefined && value !== null ? String(value) : ''
          ])
          y = drawStyledTable(headers, rows, y)
        }

        // Handle nested objects
        for (const [key, value] of Object.entries(data)) {
          if (key === 'photos') continue
          
          if (typeof value === 'object' && value !== null) {
            // Add subsection header
            if (y + 40 > pageHeight - margin) {
              doc.addPage()
              y = addHeaderImage()
            }
            
            doc.font('Helvetica-Bold')
               .fontSize(11)
               .fillColor(colors.sectionHeaderText)
               .text(formatLabel(key), margin, y, { width: tableWidth })
            
            y += 25
            y = renderFormData(value, y)
          }
        }
      }

      return y
    }

    // Add cover page
    addCoverPage()

    // Main content
    doc.fontSize(18)
       .font('Helvetica-Bold')
       .fillColor(colors.cellText)
       .text(`Project: ${projectName}`, { align: 'center' })
    doc.moveDown(0.5)

    let isFirstForm = true
    Object.keys(formData).forEach((stageKey) => {
      const forms = formData[stageKey]
      Object.entries(forms).forEach(([formKey, formValue]) => {
        if (!isFirstForm) {
          doc.addPage()
          addHeaderImage()
        }
        isFirstForm = false

        let y = doc.y
        
        // Get form title
        const stageNumber = stageKey.toLowerCase()
        const formNumber = formKey.toLowerCase()
        const formTitle = formTitles[stageNumber] && formTitles[stageNumber][formNumber] 
          ? formTitles[stageNumber][formNumber] 
          : formatLabel(formKey)

        // Draw form title header
        y = drawFormTitleHeader(formTitle, y)
        
        // Render form data as styled tables
        y = renderFormData(formValue, y)
      })
    })

    // Add last page
    addLastPage()

    doc.end()
  } catch (err) {
    console.error("Error generating PDF:", err)
    res.status(500).json({ error: "Failed to generate PDF" })
  }
}
