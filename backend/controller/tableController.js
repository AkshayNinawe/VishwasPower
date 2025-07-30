
import Form1 from "../model/forms/Form1.js";

export const getTableData = async (req, res) => {
  console.log("Backend API for getTableData ")
  const tableNumber = parseInt(req.params.id);
  const { items } = req.body;

};

export const setTableData = async (req, res) => {
  console.log("Backend API for setTableData");

  try {
    const {
      projectName,
      companyName,
      coreFrameObtainedValue,
      coreFrameRemarks,
      frameTankObtainedValue,
      frameTankRemarks,
      coreTankObtainedValue,
      coreTankRemarks,
      vpesSignature,
      customerSignature,
      date
    } = req.body;

    // Create new form document
    const newForm1 = new Form1({
      projectName,
      companyName,
      coreFrameObtainedValue,
      coreFrameRemarks,
      frameTankObtainedValue,
      frameTankRemarks,
      coreTankObtainedValue,
      coreTankRemarks,
      vpesSignature,
      customerSignature,
      date
    });

    // Save to MongoDB
    await newForm1.save();

    res.status(201).json({
      message: "Form data saved successfully",
      data: newForm1
    });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "Failed to save form data", error: error.message });
  }
};


