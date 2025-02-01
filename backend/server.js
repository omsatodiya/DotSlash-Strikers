import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import cors
import { connectDB } from "./config/db.js";
import HospitalRoutes from "./routes/hospital.route.js";
import ItemRoutes from "./routes/items.route.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node"; // Correct import
import "dotenv/config";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Add Authorization header
  })
);

// Clerk Middleware
app.use((req, res, next) => {
  console.log("Clerk Middleware");
  next();
});

// Routes
app.use("/api/hospital", HospitalRoutes);
app.use("/api/item", ItemRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("API is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB(); // Connect to the database
  console.log(`Server is running on port ${PORT}`);
});
