import express from 'express';
import Project from '../model/Project.js';

const router = express.Router();

// Add a new project
router.post('/', async (req, res) => {
  try {
    console.log("Add new project" )
    const { projectName, projectDescription, projectCompany } = req.body;
    console.log("Adding project with detail", projectName, projectDescription)
    const newProject = new Project({ projectName, projectDescription, projectCompany });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all projects
router.get('/', async (req, res) => {
  console.log("Get all projects")
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a project by ID
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;