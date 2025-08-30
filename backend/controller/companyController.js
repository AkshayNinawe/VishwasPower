import express from "express";
import Company from "../model/Company.js";

const router = express.Router();

// Add a new Company
export const setNewCompanyData = async (req, res) => {
  try {
    console.log("Add new company");
    const { companyName, companyDescription } = req.body;
    console.log("Adding company with detail", companyName, companyDescription);
    const newCompany = new Company({
      companyName,
      companyDescription,
    });
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new project to exisiting company
export const setCompanyData = async (req, res) => {
  try {
    const { companyName, projectName, companyProjects } = req.body;
    const updatedCompany = await Company.findOneAndUpdate(
      { companyName: companyName },
      { $push: { companyProjects: companyProjects }, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedCompany) {
      return res
        .status(404)
        .json({ message: `Project with name '${projectName}' not found.` });
    }
    res.status(200).json({
      message: `Project '${projectName}' added and linked to company '${companyName}'.`,
      project: updatedCompany,
    });
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred." });
  }
};

export const deleteProjectByName = async (req, res) => {
  try {
    const { companyName, projectName } = req.body; 
    if (!companyName || !projectName) {
      return res.status(400).json({ message: "companyName and projectName are required." });
    }
  
    const updatedCompany = await Company.findOneAndUpdate(
      { companyName: companyName },
      { $pull: { companyProjects: { name: projectName } }, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({
        message: `Company '${companyName}' not found or project '${projectName}' not deleted.`,
      });
    }

    res.status(200).json({
      message: `Project '${projectName}' deleted successfully from company '${companyName}'.`,
      company: updatedCompany,
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};

export const deleteCompanyByName = async (req, res) => {
  try {
    const { companyName } = req.body; 
    if (!companyName) {
      return res.status(400).json({ message: "companyName are required." });
    }
  
    const deletedCompany = await Company.findOneAndDelete({ companyName });

    if (!deletedCompany) {
      return res.status(404).json({
        message: `Company '${companyName}' not found.`,
      });
    }

    res.status(200).json({
      message: `Company '${companyName}' deleted successfully.`,
      company: deletedCompany,
    });
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};

// Get all Company
export const getAllCompanyData = async (req, res) => {
  console.log("Get all Company");
  try {
    const Companies = await Company.find();
    res.json(Companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const setapproveCompanyStage =  async(req, res) =>{
  try {
    const { companyName, projectName, stage } = req.body;
    const stageNumber = Number(stage);
    console.log(companyName, projectName, stageNumber)
    const updateOperation = {
      $set: {
        [`companyProjects.$.stageApprovals.${stageNumber}`]: true,
        "companyProjects.$.formsCompleted": 0,
      },
    };

    if (stageNumber !== 6) {
      updateOperation.$inc = { "companyProjects.$.stage": 1 };
      updateOperation.$set["companyProjects.$.status"] = "in-progress";
    } else {
      console.log("white house")
      updateOperation.$set["companyProjects.$.status"] = "completed";
    }
  
    const updatedCompany = await Company.findOneAndUpdate(
      {
        companyName: companyName,
        "companyProjects.name": projectName,
      },
      updateOperation,
      {
        new: true, // Return the updated document
      }
    );
  
    if (!updatedCompany) {
      return res.status(404).json({
        message: `Company with name '${companyName}' or project with name '${projectName}' not found.`,
      });
    }
  
    res.status(200).json({
      message:
      stageNumber !== 6
          ? `Stage '${stageNumber}' for project '${projectName}' successfully approved.`
          : `Stage '${stageNumber}' for project '${projectName}' marked as completed.`,
      project: updatedCompany.companyProjects.find(
        (proj) => proj.name === projectName
      ),
    });
  } catch (error) {
    console.error("Error approving company stage:", error);
    res.status(500).json({
      message: "An internal server error occurred.",
      error: error.message,
    });
  }
}


// Delete a Company by ID
export const deleteCompanyByID = async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const setFormsCompleted = async (req, res) => {
  try {
    // Added 'totalForms' to the destructuring to make the logic dynamic
    const { companyName, projectName, formsCompleted, status, stage } = req.body;

    // Build the update object dynamically
    const updateFields = {};
    const updateSets = {
      "companyProjects.$.lastActivity": new Date(),
    };
    updateFields["$max"] = {
      "companyProjects.$.formsCompleted": formsCompleted,
    };
    if (status) {
      updateSets["companyProjects.$.status"] = status;
    }
    
    // Corrected logic: Dynamically create a Map object instead of an Array
    if (Number(stage) && 6) {
      const submittedStagesMap = {};
      for (let i = 1; i <= 6; i++) {
        submittedStagesMap[i.toString()] = i <= stage;
      }
      updateSets["companyProjects.$.submittedStages"] = submittedStagesMap;
    }
    
    updateFields["$set"] = updateSets;
    console.log(updateSets);

    // Find the company and the specific project within its array
    const updatedCompany = await Company.findOneAndUpdate(
      {
        companyName: companyName,
        "companyProjects.name": projectName,
      },
      updateFields,
      {
        new: true, // Return the updated document
      }
    );

    // If no company or project was found, return an error
    if (!updatedCompany) {
      return res.status(404).json({
        message: `Company with name '${companyName}' or project with name '${projectName}' not found.`,
      });
    }

    res.status(200).json({
      message: `Forms completed and status for project '${projectName}' successfully updated.`,
      project: updatedCompany.companyProjects.find(
        (proj) => proj.name === projectName
      ),
    });
  } catch (error) {
    console.error("Error updating forms completed and status:", error);
    res.status(500).json({
      message: "An internal server error occurred.",
      error: error.message,
    });
  }
};

export default router;
