
import Stage1Form1 from "../model/forms/Stage1Form1.js";

export const getTableData = async (req, res) => {
  console.log("Backend API for getTableData ")
  try {
    const {tableName} = req.params
    const { companyName, projectName} = req.query
    
    if(tableName === 'Stage1Form1'){
      const data = await Stage1Form1.findOne({
        CompanyName: companyName,
        projectName: projectName
      });

      if (!data) {
        return res.status(200).json({ message: 'No data found for the specified company and project.' });
      }
  
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "Failed to save form data", error: error.message });
  }
};

export const setTableData = async (req, res) => {
  console.log("Backend API for setTableData");
  try {
    const { data, companyName, projectName  } = req.body;
    data.photos = []
    const updatedForm = await Stage1Form1.findOneAndUpdate(
      { projectName, companyName }, // Query to find the document
      { data }, // Data to update or set
      {
        new: true, // Return the new, modified document
        upsert: true, // Create a new document if none is found
        runValidators: true // Run schema validators on the new or updated document
      }
    );

    res.status(201).json({
      message: "Form data saved successfully",
      data: updatedForm
    });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "Failed to save form data", error: error.message });
  }
};


