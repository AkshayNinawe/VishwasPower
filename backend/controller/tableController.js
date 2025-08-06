
import Stage1Form1 from "../model/forms/Stage1Form1.js";

export const getTableData = async (req, res) => {
  console.log("Backend API for getTableData ")
  const tableNumber = parseInt(req.params.id);
  const { items } = req.body;

};

export const setTableData = async (req, res) => {
  console.log("Backend API for setTableData");
  //  console.log(req.body)
  try {
    const { formData,  } = req.body;
    const {tableNumber} = req.params
    const newStage1Form1 = new Stage1Form1(formData);

    console.log("sdjknsfjknskjdnfl")
    // Save to MongoDB
    await newStage1Form1.save();

    res.status(201).json({
      message: "Form data saved successfully",
      data: newStage1Form1
    });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "Failed to save form data", error: error.message });
  }
};


