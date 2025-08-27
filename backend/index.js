import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoute.js";
import autoTransformerRoute from "./routes/autoTransformerRoutes.js";
import companyRoute from "./routes/companyRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Ensure uploads folder exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

// 🔹 Serve uploads as static files
app.use("/uploads", express.static(uploadsPath));

// 🔹 API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/company", companyRoute);
app.use("/api/data/", autoTransformerRoute);

// 🟢 Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
