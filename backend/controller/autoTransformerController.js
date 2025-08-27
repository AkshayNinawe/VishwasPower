import AutoTransformer from "../model/AutoTransformer.js";
import multer from "multer";
import path from "path";

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
    // Handle any potential server errors.
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
            // if it's a JSON string (e.g. accessories), parse it
            const parsed = JSON.parse(value);
            parsedData[key] = parsed;
          } catch {
            parsedData[key] = value; // keep as string
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
