import AutoTransformer from "../model/AutoTransformer.js";

export const getStageTableData =  async (req, res) => {
  console.log("Backend API for getStageTableData");
  try {
    const { projectName, companyName, stage } = req.body;
    const queryPath = `autoTransformerData.stage${stage}`;
    const document = await AutoTransformer.findOne(
      { projectName, companyName },
      { [queryPath]: 1 }
    ).lean();

    if (!document) {
      return res.status(404).json({ message: "Project document not found.", });
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

    res.status(200).json({
      message: `Data for stage ${stage} retrieved successfully`,
      data: nestedData,
    });
  }catch (error) {
    console.error("Error retrieving form data:", error);
    res.status(500).json({
      message: "Failed to retrieve form data",
      error: error.message,
    });
  }
}

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
      return res.status(404).json({ message: "Project document not found.", });
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

    const document = await AutoTransformer.findOne(
      { projectName, companyName }
    ).lean();

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
    const { projectName, companyName, formNumber, stage, data } = req.body;
    if (data.photo !== undefined) {
      data.photo = [];
    }
    if (data.photos !== undefined) {
      data.photos = [];
    } // to be fixed later
    const updatedForm = await AutoTransformer.findOneAndUpdate(
      { projectName, companyName },
      {
        $set: { [`autoTransformerData.stage${stage}.form${formNumber}`]: data },
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(201).json({
      message: "Form data saved successfully",
      data: updatedForm,
    });
  } catch (error) {
    console.error("Error saving form data:", error);
    res
      .status(500)
      .json({ message: "Failed to save form data", error: error.message });
  }
};
