import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
  getTableData,
  setTableData,
  getCompleteTableData,
  getStageTableData,
  generatePDF,
} from "../controller/TractionDataController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Multer storage with custom filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const match = file.fieldname.match(/photos\[(.+)\]/);
    const photoKey = match ? match[1] : "Photo";

    const companyName = (req.body.companyName || "Company").replace(
      /\s+/g,
      "_"
    );
    const projectName = (req.body.projectName || "Project").replace(
      /\s+/g,
      "_"
    );
    const stage = req.body.stage ? `Stage${req.body.stage}` : "Stage";
    const formNumber = req.body.formNumber
      ? `Form${req.body.formNumber}`
      : "Form";

    const ext = path.extname(file.originalname);
    const fileName = `${companyName}_${projectName}_${stage}_${formNumber}_${photoKey}${ext}`;

    cb(null, fileName);
  },
});

const upload = multer({ storage });

// ========== ROUTES ==========
router.post("/getTable", getTableData);
router.post("/getStageTable", getStageTableData);
router.post("/getCompleteTable", getCompleteTableData);
router.post("/setTable", upload.any(), setTableData);
router.post("/download-all-forms", generatePDF);

export default router;
