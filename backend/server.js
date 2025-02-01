import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import itemRoutes from "./routes/items.route.js";
import cors from "cors";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { config } from "dotenv";

dotenv.config();

const app = express();

app.get("/api/protected", ClerkExpressRequireAuth(), (req, res) => {
  const user = req.auth;
  console.log(user);
  res.json({ message: "This is a protected route!", user });
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Routes
app.use("/api/items", itemRoutes);

app.get("/", (req, res) => {
  res.send("API is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
