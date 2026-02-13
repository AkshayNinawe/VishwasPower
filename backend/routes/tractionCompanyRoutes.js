import express from "express";
import {
  setCompanyData,
  setNewCompanyData,
  getAllCompanyData,
  deleteCompanyByID,
  setFormsCompleted,
  setapproveCompanyStage,
  deleteProjectByName,
  deleteCompanyByName,
  rejectCompanyStage
} from "../controller/tractionCompanyController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", setNewCompanyData);
router.post("/addCompany", setCompanyData);
router.post("/approveCompanyStage",  protect,  authorize("etcadmin", "admin"),  setapproveCompanyStage);
router.get("/", getAllCompanyData);
router.post("/rejectStage", rejectCompanyStage)
router.post("/updateFormsCompleted", setFormsCompleted);
router.delete("/deleteProject",  protect,  authorize("etcadmin", "admin"),  deleteProjectByName);
router.delete("/deleteCompany",  protect,  authorize("etcadmin", "admin"),  deleteCompanyByName);

export default router;
