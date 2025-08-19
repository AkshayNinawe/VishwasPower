import express from "express";
import { getTableData, setTableData, getCompleteTableData, getStageTableData } from "../controller/autoTransformerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to get table by table_number
// router.get('/getTable/:tableName', protect, getTableData);
router.post("/getTable", getTableData);
router.post("/getStageTable", getStageTableData);
router.post("/getCompleteTable", getCompleteTableData);
router.post("/setTable", setTableData);

export default router;
