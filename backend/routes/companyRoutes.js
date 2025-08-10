import express from "express";
import {
  setCompanyData,
  setNewCompanyData,
  getAllCompanyData,
  deleteCompanyByID,
  setFormsCompleted,
  setapproveCompanyStage
} from "../controller/companyController.js";

const router = express.Router();

router.post("/", setNewCompanyData);
router.post("/addCompany", setCompanyData);
router.post("/approveCompanyStage", setapproveCompanyStage);
router.get("/", getAllCompanyData);
router.delete("/:id", deleteCompanyByID);
router.post("/updateFormsCompleted", setFormsCompleted)

export default router;
