import express from "express";
import Company from "../model/Company.js";

const router = express.Router();

// Add a new Company
export const setNewCompanyData = async (req, res) => {
  try {
    console.log("Add new company");
    const { companyName, companyDescription, companyProject } = req.body;
    console.log(
      "Adding company with detail",
      companyName,
      companyDescription,
      companyProject
    );
    const newCompany = new Company({
      companyName,
      companyDescription,
      companyProject,
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

// Delete a Company by ID
export const deleteCompanyByID = async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default router;
