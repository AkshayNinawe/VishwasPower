import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoute.js";
import AutoCompanyRoute from "./routes/autoCompanyRoutes.js";
import AutoDataRoute from "./routes/autoDataRoutes.js";
import VConnectCompanyRoute from "./routes/vConnectCompanyRoutes.js"
import VConnectDataRoute from "./routes/vConnectDataRoute.js"
import TractionCompanyRoute from "./routes/tractionCompanyRoutes.js"
import TractionDataRoute from "./routes/tractionDataRoute.js"

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Ensure uploads folder exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

// ✅ Serve static files from uploads
app.use("/uploads", express.static(uploadsPath));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/autocompany", AutoCompanyRoute);
app.use("/api/autoData/", AutoDataRoute);
app.use("/api/vconnectcompany", VConnectCompanyRoute);
app.use("/api/vconnectData/", VConnectDataRoute);
app.use("/api/tractioncompany", TractionCompanyRoute);
app.use("/api/tractionData/", TractionDataRoute);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
