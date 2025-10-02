import AutoTransformer from "../model/AutoTransformer.js"
import multer from "multer"
import path from "path"
import fs from "fs"
import PDFDocument from "pdfkit"

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
  console.log("Backend API for getStageTableData")
  try {
    const { projectName, companyName, stage } = req.body
    const queryPath = `autoTransformerData.stage${stage}`
    const document = await AutoTransformer.findOne(
      { projectName, companyName },
      { [queryPath]: 1, projectName: 1, companyName: 1 },
    ).lean()

    if (!document) {
      return res.status(404).json({ message: "Project document not found." })
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
            newPhotos[key] = `${baseUrl}/${value}`
          } else if (Array.isArray(value)) {
            newPhotos[key] = value.map((v) => (typeof v === "string" ? `${baseUrl}/${v}` : v))
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
    console.error("Error retrieving form data:", error)
    res.status(500).json({
      message: "Failed to retrieve form data",
      error: error.message,
    })
  }
}

export const getTableData = async (req, res) => {
  console.log("Backend API for getTableData")
  try {
    const { projectName, companyName, stage, formNumber } = req.body
    const queryPath = `autoTransformerData.stage${stage}.form${formNumber}`
    const document = await AutoTransformer.findOne({ projectName, companyName }, { [queryPath]: 1 }).lean()

    if (!document) {
      return res.status(404).json({ message: "Project document not found." })
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
    console.error("Error retrieving form data:", error)
    res.status(500).json({
      message: "Failed to retrieve form data",
      error: error.message,
    })
  }
}

export const getCompleteTableData = async (req, res) => {
  console.log("Backend API for getCompleteTable")
  try {
    const { projectName, companyName } = req.body

    const document = await AutoTransformer.findOne({
      projectName,
      companyName,
    }).lean()

    if (!document) {
      return res.status(404).json({
        message: "Project document not found.",
      })
    }

    // Send the retrieved data back to the client.
    res.status(200).json({
      message: `Data for stage ${projectName}, form ${companyName} retrieved successfully`,
      data: document,
    })
  } catch (error) {
    console.error("Error retrieving form data:", error)
    res.status(500).json({
      message: "Failed to retrieve form data",
      error: error.message,
    })
  }
}

export const setTableData = async (req, res) => {
  console.log("Backend API for setTableData")

  try {
    const { projectName, companyName, formNumber, stage } = req.body

    const parsedData = {}

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
    console.error("Error saving form data:", error)
    res.status(500).json({
      message: "Failed to save form data",
      error: error.message,
    })
  }
}

export const generatePDF = async (req, res) => {
  try {
    const { projectName, formData } = req.body

    const doc = new PDFDocument({ margin: 50 })
    const filename = `${projectName || "project"}_all_stages_${new Date().toISOString().split("T")[0]}.pdf`

    // Response headers
    res.setHeader("Content-disposition", `attachment; filename="${filename}"`)
    res.setHeader("Content-type", "application/pdf")
    doc.pipe(res)

    // Constants
    const pageHeight = doc.page.height
    const pageWidth = doc.page.width
    const margin = 50
    const headerHeight = 60 // Space reserved for header image
    const keyColumnWidth = 220
    const valueColumnWidth = 320
    const rowHeight = 30 // slightly taller for better readability
    const leftX = margin
    const tableWidth = keyColumnWidth + valueColumnWidth
    const colors = {
      headerBg: "#E9EEF5", // was #F0F3F6
      subHeaderBg: "#F2F6FB", // was #F7F9FB
      rowStripe: "#F7F9FC", // was #FAFAFA
      border: "#3D3D3D", // was #444444
      text: "#000000",
    }
    doc.lineWidth(1.2).strokeColor(colors.border).fillColor(colors.text)

    // Add cover page using the FirstPage.jpg image
    const addCoverPage = () => {
      try {
        const coverImagePath = path.join(process.cwd(), 'src/FirstPage.jpg')
        if (fs.existsSync(coverImagePath)) {
          // Add the cover page image - fit it to the page
          doc.image(coverImagePath, 0, 0, {
            fit: [pageWidth, pageHeight],
            align: 'center',
            valign: 'center'
          })
          // Add a new page for the content
          doc.addPage()
        }
      } catch (error) {
        console.error('Error adding cover page:', error)
        // Continue without cover page if there's an error
      }
    }

    // Add last page using the LastPage.jpg image
    const addLastPage = () => {
      try {
        const lastPageImagePath = path.join(process.cwd(), 'src/LastPage.jpg')
        if (fs.existsSync(lastPageImagePath)) {
          // Add a new page for the last page
          doc.addPage()
          // Add the last page image - fit it to the page
          doc.image(lastPageImagePath, 0, 0, {
            fit: [pageWidth, pageHeight],
            align: 'center',
            valign: 'center'
          })
        }
      } catch (error) {
        console.error('Error adding last page:', error)
        // Continue without last page if there's an error
      }
    }

    // Add the cover page first
    addCoverPage()

    // Track if we're on the first page (cover page)
    let isFirstPage = true

    // Function to add header image to pages (except first page)
    const addHeaderImage = () => {
      if (isFirstPage) {
        isFirstPage = false
        return margin // Return normal margin for first content page
      }
      
      try {
        const headerImagePath = path.join(process.cwd(), 'src/Header.jpg')
        if (fs.existsSync(headerImagePath)) {
          // Add header image at the top of the page with small height
          doc.image(headerImagePath, margin, 10, {
            width: pageWidth - (margin * 2),
            height: headerHeight - 20 // Keep it compact
          })
          return margin + headerHeight // Return adjusted margin to account for header
        }
      } catch (error) {
        console.error('Error adding header image:', error)
      }
      return margin // Return normal margin if header fails
    }

    let stripe = false

    const drawHeaderBand = (title, y) => {
      const bandHeight = 28
      // Page break check
      if (y + bandHeight > pageHeight - margin) {
        doc.addPage()
        y = addHeaderImage() // Add header and get adjusted margin
      }
      doc.save().rect(leftX, y, tableWidth, bandHeight).fill(colors.headerBg).restore()
      doc.rect(leftX, y, tableWidth, bandHeight).stroke()
      doc
        .font("Helvetica-Bold")
        .fontSize(13)
        .fillColor(colors.text)
        .text(title, leftX + 5, y + 7)
      return y + bandHeight + 8 // small gap after header
    }

    const drawSubHeader = (title, y) => {
      const bandHeight = 22
      if (y + bandHeight > pageHeight - margin) {
        doc.addPage()
        y = addHeaderImage() // Add header and get adjusted margin
      }
      doc.save().rect(leftX, y, tableWidth, bandHeight).fill(colors.subHeaderBg).restore()
      doc.rect(leftX, y, tableWidth, bandHeight).stroke()
      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor(colors.text)
        .text(title, leftX + 5, y + 5)
      return y + bandHeight + 6
    }

    const drawColumnHeader = (y) => {
      const bandHeight = 26
      if (y + bandHeight > pageHeight - margin) {
        doc.addPage()
        y = addHeaderImage() // Add header and get adjusted margin
      }
      // background band across both columns
      doc.save().rect(leftX, y, tableWidth, bandHeight).fill(colors.headerBg).restore()
      // borders around each column
      doc.rect(leftX, y, keyColumnWidth, bandHeight).stroke()
      doc.rect(leftX + keyColumnWidth, y, valueColumnWidth, bandHeight).stroke()

      doc.font("Helvetica-Bold").fontSize(11).fillColor(colors.text)
      doc.text("Field", leftX + 6, y + 6, { width: keyColumnWidth - 12 })
      doc.text("Value", leftX + keyColumnWidth + 6, y + 6, { width: valueColumnWidth - 12 })
      return y + bandHeight
    }

    const drawRow = (key, value, y) => {
      if (y + rowHeight > pageHeight - margin) {
        doc.addPage()
        y = addHeaderImage() // Add header and get adjusted margin
      }

      // Stripe background across the full width of both columns
      if (stripe) {
        doc.save().rect(leftX, y, tableWidth, rowHeight).fill(colors.rowStripe).restore()
      }

      // Cell borders
      doc.rect(leftX, y, keyColumnWidth, rowHeight).stroke()
      doc.rect(leftX + keyColumnWidth, y, valueColumnWidth, rowHeight).stroke()

      // Key and value
      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor(colors.text)
        .text(`${formatLabel(key)}:`, leftX + 5, y + 7, {
          width: keyColumnWidth - 10,
        })

      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor(colors.text)
        .text(value !== undefined && value !== null ? String(value) : "", leftX + keyColumnWidth + 5, y + 7, {
          width: valueColumnWidth - 10,
        })

      // Flip stripe for next row
      stripe = !stripe
      return y + rowHeight
    }

    const drawImageRow = (key, photoPath, y) => {
      const imgMaxHeight = 150
      const imgMaxWidth = valueColumnWidth - 10
      let rowHeightDynamic = imgMaxHeight + 30

      if (y + rowHeightDynamic > pageHeight - margin) {
        doc.addPage()
        y = addHeaderImage() // Add header and get adjusted margin
      }

      try {
        const fullPath = path.join(process.cwd(), photoPath)
        if (fs.existsSync(fullPath)) {
          if (stripe) {
            doc.save().rect(leftX, y, tableWidth, rowHeightDynamic).fill(colors.rowStripe).restore()
          }

          doc.rect(leftX, y, keyColumnWidth, rowHeightDynamic).stroke()
          doc.rect(leftX + keyColumnWidth, y, valueColumnWidth, rowHeightDynamic).stroke()

          doc
            .font("Helvetica-Bold")
            .fontSize(10)
            .fillColor(colors.text)
            .text(`${formatLabel(key)}:`, leftX + 5, y + 8)
          doc.image(fullPath, leftX + keyColumnWidth + 5, y + 6, {
            fit: [imgMaxWidth, imgMaxHeight],
            align: "center",
            valign: "top",
          })

          // Flip stripe for next row
          stripe = !stripe
        } else {
          rowHeightDynamic = rowHeight
          return drawRow(key, photoPath, y)
        }
      } catch {
        rowHeightDynamic = rowHeight
        return drawRow(key, photoPath, y)
      }

      return y + rowHeightDynamic
    }

    const drawTable = (data, startY) => {
      let y = startY

      for (const [key, value] of Object.entries(data)) {
        if (y + rowHeight > pageHeight - margin) {
          doc.addPage()
          y = margin
        }

        if (value && typeof value === "object" && !Array.isArray(value)) {
          if (String(key).toLowerCase() === "photos") {
            for (const [photoKey, photoPath] of Object.entries(value)) {
              y = drawImageRow(photoKey, photoPath, y)
            }
          } else {
            // Subsection header with band
            y = drawSubHeader(`${formatLabel(key)}`, y)
            // Reset stripe for each subsection for a clean start
            stripe = false
            y = drawTable(value, y)
          }
        } else if (Array.isArray(value)) {
          y = drawSubHeader(`${formatLabel(key)}`, y)
          stripe = false
          value.forEach((item, i) => {
            if (typeof item === "object") {
              y = drawSubHeader(`Item ${i + 1}`, y)
              stripe = false
              y = drawTable(item, y)
            } else {
              y = drawRow(`Item ${i + 1}`, item, y)
            }
          })
        } else {
          y = drawRow(key, value, y)
        }
      }

      return y
    }

    // Render Stage/Form headers with header bands and reset striping
    doc.fontSize(20).font("Helvetica-Bold").text(`Project: ${projectName}`, { align: "center" })
    doc.moveDown(0.5)

    Object.keys(formData).forEach((stageKey, stageIndex) => {
      if (stageIndex > 0) {
        doc.addPage()
        // Add header to new page
        addHeaderImage()
      }

      let y = doc.y
      y = drawHeaderBand(`Stage: ${formatLabel(stageKey)}`, y)
      stripe = false

      const forms = formData[stageKey]
      Object.entries(forms).forEach(([formKey, formValue], formIndex) => {
        if (formIndex > 0) {
          doc.addPage()
          y = addHeaderImage() // Add header and get adjusted margin
          y = drawHeaderBand(`Stage: ${formatLabel(stageKey)}`, y)
        }

        y = drawHeaderBand(`Form: ${formatLabel(formKey)}`, y)
        y = drawColumnHeader(y)
        stripe = false

        const endY = drawTable(formValue, y)
        doc.y = endY + 6 // small gap after a form block
      })
    })

    // Add the last page before ending the document
    addLastPage()

    doc.end()
  } catch (err) {
    console.error("Error generating PDF:", err)
    res.status(500).json({ error: "Failed to generate PDF" })
  }
}
