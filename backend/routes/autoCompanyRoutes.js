import express from "express";
import {
  setCompanyData,
  setNewCompanyData,
  getAllCompanyData,
  setFormsCompleted,
  setapproveCompanyStage,
  deleteProjectByName,
  deleteCompanyByName,
  rejectCompanyStage
} from "../controller/autoCompanyController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", setNewCompanyData);
router.post("/addCompany", setCompanyData);
router.post("/approveCompanyStage", protect, authorize("etcadmin", "admin"), setapproveCompanyStage);
router.get("/", getAllCompanyData);
router.post("/rejectStage", rejectCompanyStage)
router.post("/updateFormsCompleted", setFormsCompleted);
router.delete("/deleteProject", deleteProjectByName);
router.delete("/deleteCompany", deleteCompanyByName);

export default router;
