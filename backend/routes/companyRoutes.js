import express from "express";
import {
  setCompanyData,
  setNewCompanyData,
  getAllCompanyData,
  deleteCompanyByID,
  setFormsCompleted,
  setapproveCompanyStage,
  deleteProjectByName
} from "../controller/companyController.js";

const router = express.Router();

router.post("/", setNewCompanyData);
router.post("/addCompany", setCompanyData);
router.post("/approveCompanyStage", setapproveCompanyStage);
router.get("/", getAllCompanyData);
router.post("/updateFormsCompleted", setFormsCompleted);
router.delete("/deleteProject", deleteProjectByName);

export default router;
