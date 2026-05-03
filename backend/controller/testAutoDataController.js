import TestAutoTransformer from "../model/TestAutoTransformer.js";
import TestAutoTransformerCompany from "../model/TestAutoTransformerCompany.js";

// ─── GET: single form data ────────────────────────────────────────────────────
// Body: { projectName, companyName, formName }
// formName must be one of the 11 form keys, e.g. "CTTestForm"
export const getTableData = async (req, res) => {
  try {
    const { projectName, companyName, formName } = req.body;

    if (!projectName || !companyName || !formName) {
      return res.status(400).json({
        message: "projectName, companyName, and formName are required.",
      });
    }

    const queryPath = `table.${formName}`;
    const document = await TestAutoTransformer.findOne(
      { projectName, companyName },
      { [queryPath]: 1, "table.submitted": 1 }
    ).lean();

    if (!document) {
      return res.status(404).json({ message: "Project document not found." });
    }

    const formData = document.table?.[formName];
    if (!formData) {
      return res.status(404).json({
        message: `Form data for '${formName}' not found.`,
      });
    }

    res.status(200).json({
      message: `Data for '${formName}' retrieved successfully.`,
      data: formData,
      submitted: document.table?.submitted?.[formName] ?? false,
    });
  } catch (error) {
    console.error("Error retrieving test auto form data:", error.message);
    res.status(500).json({
      message: "Failed to retrieve form data.",
      error: error.message,
    });
  }
};

// ─── GET: complete table data for a project ───────────────────────────────────
// Body: { projectName, companyName }
export const getCompleteTableData = async (req, res) => {
  try {
    const { projectName, companyName } = req.body;

    if (!projectName || !companyName) {
      return res.status(400).json({
        message: "projectName and companyName are required.",
      });
    }

    const document = await TestAutoTransformer.findOne(
      { projectName, companyName }
    ).lean();

    if (!document) {
      return res.status(404).json({ message: "Project document not found." });
    }

    res.status(200).json({
      message: `Complete table data for project '${projectName}' retrieved successfully.`,
      data: document,
    });
  } catch (error) {
    console.error("Error retrieving complete test auto table data:", error.message);
    res.status(500).json({
      message: "Failed to retrieve complete table data.",
      error: error.message,
    });
  }
};

// ─── GET: submitted flags only ────────────────────────────────────────────────
// Body: { projectName, companyName }
export const getSubmittedFlags = async (req, res) => {
  try {
    const { projectName, companyName } = req.body;

    if (!projectName || !companyName) {
      return res.status(400).json({
        message: "projectName and companyName are required.",
      });
    }

    const document = await TestAutoTransformer.findOne(
      { projectName, companyName },
      { "table.submitted": 1 }
    ).lean();

    if (!document) {
      return res.status(404).json({ message: "Project document not found." });
    }

    res.status(200).json({
      message: "Submitted flags retrieved successfully.",
      submitted: document.table?.submitted ?? {},
    });
  } catch (error) {
    console.error("Error retrieving submitted flags:", error.message);
    res.status(500).json({
      message: "Failed to retrieve submitted flags.",
      error: error.message,
    });
  }
};

// ─── POST: save / update a single form's data ─────────────────────────────────
// Body: { projectName, companyName, formName, ...all form fields }
// Also sets table.submitted.<formName> = true and updates company submittedForms
export const setTableData = async (req, res) => {
  try {
    const { projectName, companyName, formName, ...formFields } = req.body;

    if (!projectName || !companyName || !formName) {
      return res.status(400).json({
        message: "projectName, companyName, and formName are required.",
      });
    }

    // Build the $set payload for TestAutoTransformer
    const setPayload = {
      [`table.${formName}`]: formFields,
      [`table.submitted.${formName}`]: true,
    };

    const updatedDocument = await TestAutoTransformer.findOneAndUpdate(
      { projectName, companyName },
      { $set: setPayload },
      { new: true, upsert: true, runValidators: true }
    );

    // Also update the submittedForms flag in TestAutoTransformerCompany
    try {
      await TestAutoTransformerCompany.findOneAndUpdate(
        {
          companyName: companyName,
          "companyProjects.name": projectName,
        },
        {
          $set: {
            [`companyProjects.$.submittedForms.${formName}`]: true,
          },
        }
      );
    } catch (companyUpdateError) {
      // Non-fatal: log but don't fail the main request
      console.warn(
        "Could not update company submittedForms flag:",
        companyUpdateError.message
      );
    }

    res.status(201).json({
      message: `Form '${formName}' saved successfully.`,
      data: updatedDocument,
    });
  } catch (error) {
    console.error("Error saving test auto form data:", error.message);
    res.status(500).json({
      message: "Failed to save form data.",
      error: error.message,
    });
  }
};

// ─── POST: manually set submitted flag for a form ────────────────────────────
// Body: { projectName, companyName, formName, submitted: true|false }
export const setFormSubmitted = async (req, res) => {
  try {
    const { projectName, companyName, formName, submitted } = req.body;

    if (!projectName || !companyName || !formName || submitted === undefined) {
      return res.status(400).json({
        message: "projectName, companyName, formName, and submitted are required.",
      });
    }

    const updatedDocument = await TestAutoTransformer.findOneAndUpdate(
      { projectName, companyName },
      { $set: { [`table.submitted.${formName}`]: Boolean(submitted) } },
      { new: true, upsert: true }
    );

    if (!updatedDocument) {
      return res.status(404).json({ message: "Project document not found." });
    }

    res.status(200).json({
      message: `Submitted flag for '${formName}' set to ${Boolean(submitted)}.`,
      submitted: updatedDocument.table?.submitted,
    });
  } catch (error) {
    console.error("Error setting submitted flag:", error.message);
    res.status(500).json({
      message: "Failed to set submitted flag.",
      error: error.message,
    });
  }
};
