import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import cors
import { connectDB } from "./config/db.js";
import HospitalRoutes from "./routes/hospital.route.js";
import ItemRoutes from "./routes/items.route.js";
import { clerkClient } from "@clerk/express";
import "dotenv/config";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/hospital", HospitalRoutes);
app.use("/api/item", ItemRoutes);
// ... existing code ...

// Home route
app.get("/", async (req, res) => {
  try {
    const allUsers = [];
    let offset = 0;
    const limit = 100; // Clerk's maximum limit per request

    while (true) {
      const { data } = await clerkClient.users.getUserList({
        limit,
        offset,
      });

      if (data.length === 0) break; // No more users to fetch

      const simplifiedUsers = data.map((user) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0]?.emailAddress || "No email provided",
      }));

      allUsers.push(...simplifiedUsers);
      offset += limit;
    }

    res.json({
      success: true,
      users: allUsers,
      total: allUsers.length,
    });
  } catch (error) {
    console.error("Clerk API Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
