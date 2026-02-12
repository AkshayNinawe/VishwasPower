import express from "express";
import AutoTransformerCompany from "../model/AutoTransformerCompany.js";
import AutoTransformer from "../model/AutoTransformer.js";

const router = express.Router();

// Add a new AutoTransformerCompany
export const setNewCompanyData = async (req, res) => {
  try {
    const { companyName, companyDescription } = req.body;

    // Validate required fields
    if (!companyName || !companyDescription) {
      return res.status(400).json({ 
        message: "Company name and description are required" 
      });
    }

    // Check if company already exists
    const existingCompany = await AutoTransformerCompany.findOne({ companyName });
    if (existingCompany) {
      return res.status(400).json({ 
        message: "Company with this name already exists" 
      });
    }

    const newCompany = new AutoTransformerCompany({
      companyName,
      companyDescription,
    });
    
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    console.error("Error creating company:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Add a new project to exisiting AutoTransformerCompany
export const setCompanyData = async (req, res) => {
  try {
    const { companyName, projectName, companyProjects } = req.body;
    const updatedCompany = await AutoTransformerCompany.findOneAndUpdate(
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
      message: `Project '${projectName}' added and linked to AutoTransformerCompany '${companyName}'.`,
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
      return res.status(400).json({ 
        message: "Company name and project name are required." 
      });
    }

    // Delete from the AutoTransformerCompany model
    const updatedCompany = await AutoTransformerCompany.findOneAndUpdate(
      { companyName },
      {
        $pull: { companyProjects: { name: projectName } },
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({
        message: `Company '${companyName}' not found or project '${projectName}' not deleted.`,
      });
    }

    // Also delete from AutoTransformer collection if it exists (case-insensitive)
    try {
      const deletedAutoTransformer = await AutoTransformer.findOneAndDelete({
        companyName: { $regex: new RegExp(`^${companyName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
        projectName: { $regex: new RegExp(`^${projectName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
      });

      if (deletedAutoTransformer) {
        console.log(`AutoTransformer data for project '${projectName}' in company '${companyName}' deleted successfully.`);
      }
    } catch (autoTransformerError) {
      console.error("Error deleting from AutoTransformer collection:", autoTransformerError.message);
      // Don't fail the entire operation if AutoTransformer deletion fails
    }

    res.status(200).json({
      message: `Project '${projectName}' deleted successfully from company '${companyName}' and associated AutoTransformer data.`,
      company: updatedCompany,
    });
  } catch (error) {
    console.error("Error deleting project:", error.message);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};

export const deleteCompanyByName = async (req, res) => {
  try {
    const { companyName } = req.body;
    
    if (!companyName) {
      return res.status(400).json({ 
        message: "Company name is required." 
      });
    }

    const deletedCompany = await AutoTransformerCompany.findOneAndDelete({ companyName });

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
    console.error("Error deleting company:", error.message);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};

// Get all Company
export const getAllCompanyData = async (req, res) => {
  try {
    const companies = await AutoTransformerCompany.find();
    res.json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const setapproveCompanyStage = async (req, res) => {
  try {
    const { companyName, projectName, stage } = req.body;
    const stageNumber = Number(stage);
    
    if (!companyName || !projectName || !stage) {
      return res.status(400).json({
        message: "Company name, project name, and stage are required."
      });
    }

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
      updateOperation.$set["companyProjects.$.status"] = "completed";
    }

    const updatedCompany = await AutoTransformerCompany.findOneAndUpdate(
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
        message: `AutoTransformerCompany with name '${companyName}' or project with name '${projectName}' not found.`,
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
    console.error("Error approving AutoTransformerCompany stage:", error.message);
    res.status(500).json({
      message: "An internal server error occurred.",
      error: error.message,
    });
  }
};

export const rejectCompanyStage = async (req, res) => {
  try {
    const { companyName, projectName, stage, rejectionReason } = req.body;
    const stageNumber = Number(stage);

    if (!companyName || !projectName || !stage) {
      return res.status(400).json({
        message: "Company name, project name, and stage are required."
      });
    }

    const updateOperation = {
      $set: {
        [`companyProjects.$.stageApprovals.${stageNumber}`]: false, // explicitly false
        [`companyProjects.$.submittedStages.${stageNumber}`]: false, // explicitly false
        "companyProjects.$.status": "rejected",
        "companyProjects.$.rejectionReason":
          rejectionReason || "No reason provided",
      },
    };

    const updatedCompany = await AutoTransformerCompany.findOneAndUpdate(
      {
        companyName: companyName,
        "companyProjects.name": projectName,
      },
      updateOperation,
      {
        new: true, // return updated doc
      }
    );

    if (!updatedCompany) {
      return res.status(404).json({
        message: `AutoTransformerCompany '${companyName}' or project '${projectName}' not found.`,
      });
    }

    res.status(200).json({
      message: `Stage '${stageNumber}' for project '${projectName}' has been rejected.`,
      project: updatedCompany.companyProjects.find(
        (proj) => proj.name === projectName
      ),
    });
  } catch (error) {
    console.error("Error rejecting AutoTransformerCompany stage:", error.message);
    res.status(500).json({
      message: "An internal server error occurred while rejecting the project stage.",
      error: error.message,
    });
  }
};

// Delete a AutoTransformerCompany by ID
export const deleteCompanyByID = async (req, res) => {
  try {
    await AutoTransformerCompany.findByIdAndDelete(req.params.id);
    res.json({ message: "AutoTransformerCompany deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const setFormsCompleted = async (req, res) => {
  try {
    // Added 'totalForms' to the destructuring to make the logic dynamic
    const { companyName, projectName, formsCompleted, status, stage } =
      req.body;

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

    // Find the AutoTransformerCompany and the specific project within its array
    const updatedCompany = await AutoTransformerCompany.findOneAndUpdate(
      {
        companyName: companyName,
        "companyProjects.name": projectName,
      },
      updateFields,
      {
        new: true, // Return the updated document
      }
    );

    // If no AutoTransformerCompany or project was found, return an error
    if (!updatedCompany) {
      return res.status(404).json({
        message: `AutoTransformerCompany with name '${companyName}' or project with name '${projectName}' not found.`,
      });
    }

    res.status(200).json({
      message: `Forms completed and status for project '${projectName}' successfully updated.`,
      project: updatedCompany.companyProjects.find(
        (proj) => proj.name === projectName
      ),
    });
  } catch (error) {
    console.error("Error updating forms completed and status:", error.message);
    res.status(500).json({
      message: "An internal server error occurred.",
      error: error.message,
    });
  }
};

export default router;
