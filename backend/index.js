import express from "express"
import dotenv from "dotenv"
import cors from 'cors'


import connectDB from "./config/db.js"
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoute.js';
import tableRoute from './routes/tableRoutes.js'
import projectRoute from './routes/projectRoutes.js'

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use("/api/table", tableRoute);
app.use("/api/projects", projectRoute);

// 🟢 Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});