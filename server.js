import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database.js";

// Importing routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
