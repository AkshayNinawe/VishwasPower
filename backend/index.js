import express from "express"
import dotenv from "dotenv"
import cors from 'cors'


import connectDB from "./config/db.js"
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoute.js';
import autoTransformerRoute from './routes/autoTransformerRoutes.js'
import companyRoute from './routes/companyRoutes.js'

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use("/api/company", companyRoute);
app.use("/api/data/", autoTransformerRoute);

// 🟢 Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});