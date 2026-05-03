import express from "express";

import {
  getTableData,
  getCompleteTableData,
  getSubmittedFlags,
  setTableData,
  setFormSubmitted,
} from "../controller/testAutoDataController.js";

const router = express.Router();

// GET a single form's data
// POST /api/test_autoData/getTable
// Body: { projectName, companyName, formName }
router.post("/getTable", getTableData);

// GET complete table data for a project (all 11 forms + submitted flags)
// POST /api/test_autoData/getCompleteTable
// Body: { projectName, companyName }
router.post("/getCompleteTable", getCompleteTableData);

// GET only the submitted flags for a project
// POST /api/test_autoData/getSubmittedFlags
// Body: { projectName, companyName }
router.post("/getSubmittedFlags", getSubmittedFlags);

// SAVE / UPDATE a single form's data (also marks submitted = true)
// POST /api/test_autoData/setTable
// Body: { projectName, companyName, formName, ...all form fields }
router.post("/setTable", setTableData);

// Manually set the submitted flag for a specific form
// POST /api/test_autoData/setFormSubmitted
// Body: { projectName, companyName, formName, submitted: true|false }
router.post("/setFormSubmitted", setFormSubmitted);

export default router;
