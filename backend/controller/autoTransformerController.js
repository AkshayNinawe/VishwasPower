import AutoTransformer from "../model/AutoTransformer.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import PDFDocument from "pdfkit";

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // save into /uploads folder
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

export const getStageTableData = async (req, res) => {
  console.log("Backend API for getStageTableData");
  try {
    const { projectName, companyName, stage } = req.body;
    const queryPath = `autoTransformerData.stage${stage}`;
    const document = await AutoTransformer.findOne(
      { projectName, companyName },
      { [queryPath]: 1, projectName: 1, companyName: 1 }
    ).lean();

    if (!document) {
      return res.status(404).json({ message: "Project document not found." });
    }

    const getNestedObject = (obj, path) => {
      return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    };
    const nestedData = getNestedObject(document, queryPath);
    if (!nestedData) {
      return res.status(404).json({
        message: `Data for stage ${stage} not found.`,
      });
    }
    // 🔹 Build base URL dynamically
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // 🔹 Recursively convert any "photos" map values to full URLs
    const convertPhotoPathsToUrls = (data) => {
      if (!data || typeof data !== "object") return data;

      if (data.photos && typeof data.photos === "object") {
        const newPhotos = {};
        for (const [key, value] of Object.entries(data.photos)) {
          if (typeof value === "string") {
            newPhotos[key] = `${baseUrl}/${value}`;
          } else if (Array.isArray(value)) {
            newPhotos[key] = value.map((v) =>
              typeof v === "string" ? `${baseUrl}/${v}` : v
            );
          }
        }
        data.photos = newPhotos;
      }

      // also check nested sub-objects
      for (const [k, v] of Object.entries(data)) {
        if (v && typeof v === "object") {
          data[k] = convertPhotoPathsToUrls(v);
        }
      }

      return data;
    };

    const responseData = convertPhotoPathsToUrls(nestedData);

    res.status(200).json({
      message: `Data for stage ${stage} retrieved successfully`,
      data: responseData,
    });
  } catch (error) {
    console.error("Error retrieving form data:", error);
    res.status(500).json({
      message: "Failed to retrieve form data",
      error: error.message,
    });
  }
};


export const getTableData = async (req, res) => {
  console.log("Backend API for getTableData");
  try {
    const { projectName, companyName, stage, formNumber } = req.body;
    const queryPath = `autoTransformerData.stage${stage}.form${formNumber}`;
    const document = await AutoTransformer.findOne(
      { projectName, companyName },
      { [queryPath]: 1 }
    ).lean();

    if (!document) {
      return res.status(404).json({ message: "Project document not found." });
    }

    const getNestedObject = (obj, path) => {
      return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    };
    const nestedData = getNestedObject(document, queryPath);
    if (!nestedData) {
      return res.status(404).json({
        message: `Data for stage ${stage}, form ${formNumber} not found.`,
      });
    }

    res.status(200).json({
      message: `Data for stage ${stage}, form ${formNumber} retrieved successfully`,
      data: nestedData,
    });
  } catch (error) {
    console.error("Error retrieving form data:", error);
    res.status(500).json({
      message: "Failed to retrieve form data",
      error: error.message,
    });
  }
};

export const getCompleteTableData = async (req, res) => {
  console.log("Backend API for getCompleteTable");
  try {
    const { projectName, companyName } = req.body;

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
    });
  } catch (error) {
    console.error("Error retrieving form data:", error);
    res.status(500).json({
      message: "Failed to retrieve form data",
      error: error.message,
    });
  }
};

export const setTableData = async (req, res) => {
  console.log("Backend API for setTableData");

  try {
    const { projectName, companyName, formNumber, stage } = req.body;

    const parsedData = {};

    // ✅ parse all body fields
    for (const [key, value] of Object.entries(req.body)) {
      if (["projectName", "companyName", "stage", "formNumber"].includes(key)) {
        parsedData[key] = value;
      } else {
        if (typeof value === "string") {
          try {
            const parsed = JSON.parse(value);
            parsedData[key] = parsed;
          } catch {
            parsedData[key] = value;
          }
        } else {
          parsedData[key] = value;
        }
      }
    }

    // ✅ process uploaded photos
    const photos = {};
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const match = file.fieldname.match(/photos\[(.+)\]/);
        if (match) {
          const key = match[1];
          photos[key] = `uploads/${file.filename}`;
        }
      });
    }

    if (Object.keys(photos).length > 0) {
      parsedData.photos = {
        ...(parsedData.photos || {}),
        ...photos,
      };
    }

    // ✅ Save into Mongo
    const updatedForm = await AutoTransformer.findOneAndUpdate(
      { projectName, companyName },
      {
        $set: {
          [`autoTransformerData.stage${stage}.form${formNumber}`]: parsedData,
        },
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(201).json({
      message: "Form data saved successfully",
      data: updatedForm,
    });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({
      message: "Failed to save form data",
      error: error.message,
    });
  }
};

export const generatePDF = async (req, res) => {
  try {
    const { projectName, formData } = req.body;

    const doc = new PDFDocument({ margin: 50 });
    const filename = `${
      projectName || "project"
    }_all_stages_${new Date().toISOString().split("T")[0]}.pdf`;

    // Response headers
    res.setHeader("Content-disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-type", "application/pdf");
    doc.pipe(res);

    // Constants
    const pageHeight = doc.page.height;
    const margin = 50;
    const keyColumnWidth = 200;
    const valueColumnWidth = 300;
    const rowHeight = 20;

    // Draw text row
    const drawRow = (key, value, y) => {
      // ✅ Check if space left
      if (y + rowHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }

      doc.rect(50, y, keyColumnWidth, rowHeight).stroke();
      doc.rect(50 + keyColumnWidth, y, valueColumnWidth, rowHeight).stroke();

      doc.font("Helvetica-Bold").fontSize(10).text(key, 55, y + 5, {
        width: keyColumnWidth - 10,
      });

      doc.font("Helvetica").fontSize(10).text(
        value !== undefined && value !== null ? String(value) : "",
        55 + keyColumnWidth,
        y + 5,
        { width: valueColumnWidth - 10 }
      );

      return y + rowHeight;
    };

    // Draw image row (auto-resize with page break check)
    const drawImageRow = (key, photoPath, y) => {
      const imgMaxHeight = 150;
      const imgMaxWidth = valueColumnWidth - 10;
      let rowHeightDynamic = imgMaxHeight + 20;

      // ✅ Pre-check: move to new page if not enough space
      if (y + rowHeightDynamic > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }

      try {
        const fullPath = path.join(process.cwd(), photoPath);
        if (fs.existsSync(fullPath)) {
          doc.rect(50, y, keyColumnWidth, rowHeightDynamic).stroke();
          doc.rect(50 + keyColumnWidth, y, valueColumnWidth, rowHeightDynamic).stroke();

          doc.font("Helvetica-Bold").fontSize(10).text(key, 55, y + 10);

          doc.image(fullPath, 55 + keyColumnWidth, y + 5, {
            fit: [imgMaxWidth, imgMaxHeight],
            align: "center",
          });
        } else {
          rowHeightDynamic = rowHeight;
          return drawRow(key, photoPath, y);
        }
      } catch (err) {
        rowHeightDynamic = rowHeight;
        return drawRow(key, photoPath, y);
      }

      return y + rowHeightDynamic;
    };

    // Recursive table drawer
    const drawTable = (data, startY) => {
      let y = startY;

      for (const [key, value] of Object.entries(data)) {
        // ✅ Page break check for each row
        if (y + rowHeight > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }

        if (value && typeof value === "object" && !Array.isArray(value)) {
          if (key.toLowerCase() === "photos") {
            for (const [photoKey, photoPath] of Object.entries(value)) {
              y = drawImageRow(photoKey, photoPath, y);
            }
          } else {
            doc.font("Helvetica-Bold").fontSize(12).text(`${key}:`, 50, y);
            y += rowHeight / 2;
            y = drawTable(value, y + 5);
          }
        } else if (Array.isArray(value)) {
          doc.font("Helvetica-Bold").fontSize(12).text(`${key}:`, 50, y);
          y += rowHeight;

          value.forEach((item, i) => {
            if (typeof item === "object") {
              doc.font("Helvetica-Bold").fontSize(10).text(`Item ${i + 1}`, 70, y);
              y += rowHeight / 2;
              y = drawTable(item, y + 5);
            } else {
              y = drawRow(`Item ${i + 1}`, item, y);
            }
          });
        } else {
          y = drawRow(key, value, y);
        }
      }

      return y;
    };

    // Title
    doc.fontSize(20).text(`Project: ${projectName}`, { align: "center" });
    doc.moveDown();

    // Loop stages
    Object.keys(formData).forEach((stageKey, stageIndex) => {
      // Stage always starts on new page (except first one)
      if (stageIndex > 0) doc.addPage();

      doc.fontSize(16).font("Helvetica-Bold").text(`Stage: ${stageKey}`);
      doc.moveDown();

      const forms = formData[stageKey];
      Object.entries(forms).forEach(([formKey, formValue], formIndex) => {
        // Form always on new page
        if (formIndex > 0) {
          doc.addPage();
          doc.fontSize(16).font("Helvetica-Bold").text(`Stage: ${stageKey}`);
          doc.moveDown();
        }

        doc.fontSize(14).font("Helvetica-Bold").text(`Form: ${formKey}`);
        doc.moveDown(0.5);

        let currentY = doc.y;
        drawTable(formValue, currentY + 5);
      });
    });

    doc.end();
  } catch (err) {
    console.error("Error generating PDF:", err);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
};
