
import Stage1Form1 from "../model/forms/Stage1Form1.js";
import Stage1Form2 from "../model/forms/Stage1Form2.js";
import Stage1Form3 from "../model/forms/Stage1Form3.js";
import Stage1Form4 from "../model/forms/Stage1Form4.js";
import Stage1Form5 from "../model/forms/Stage1Form5.js";

const StageSchemas = {
  'Stage1Form1' : Stage1Form1,
  'Stage1Form2' : Stage1Form2,
  'Stage1Form3' : Stage1Form3,
  'Stage1Form4' : Stage1Form4,
  'Stage1Form5' : Stage1Form5,
}

export const getTableData = async (req, res) => {
  console.log("Backend API for getTableData ")
  try {
    const {tableName} = req.params
    const { companyName, projectName} = req.query
    
    if(StageSchemas[tableName]){
      const StageSchema = StageSchemas[tableName]
      const data = await StageSchema.findOne({
        companyName: companyName,
        projectName: projectName
      });

      if (!data) {
        return res.status(200).json({ message: 'No data found for the specified company and project.' });
      }
      res.status(200).json(data);

    }else{
      return res.status(200).json({ message: 'Invalid schema' });
    }

  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "Failed to save form data", error: error.message });
  }
};

export const setTableData = async (req, res) => {
  console.log("Backend API for setTableData");
  try {
    const {tableName} = req.params
    const { data, companyName, projectName  } = req.body;
    if(tableName === 'stage1form1')
      {
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
      }
      if(tableName === 'stage1form2')
        {
          data.photos = []
          const updatedForm = await Stage1Form2.findOneAndUpdate(
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
        }
        if(tableName === 'stage1form3')
          {
            const updatedForm = await Stage1Form3.findOneAndUpdate(
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
          }
          if(tableName === 'stage1form4')
            {
              const updatedForm = await Stage1Form4.findOneAndUpdate(
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
            }
            if(tableName === 'stage1form5')
              {
                const updatedForm = await Stage1Form5.findOneAndUpdate(
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
              }

    

    
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "Failed to save form data", error: error.message });
  }
};


