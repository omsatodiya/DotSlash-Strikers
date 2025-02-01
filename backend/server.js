import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import cors
import { connectDB } from "./config/db.js";
import HospitalRoutes from "./routes/hospital.route.js";
import ItemRoutes from "./routes/items.route.js";
import { clerkClient } from "@clerk/express";
import "dotenv/config";
import Hospital from "./models/hospital.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
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

// nearest hospital

app.post("/api/fun", async (req, res) => {
  const lon = req.body.lon;
  const lat = req.body.lat;

  if (!lat || !lon) {
      return res.status(400).send("Latitude and Longitude are required.");
  }

  const parsedLat = parseFloat(lat);
  const parsedLon = parseFloat(lon);

  if(isNaN(parsedLat) || isNaN(parsedLon))
  {
      return res.status(400).send("Invalid latitude or longitude.");
  }

  try {
      // Create GeoJSON object for the user's location
      const userLocation = {
          type: "Point",
          coordinates: [parsedLon, parsedLat],  // Longitude, Latitude order
      };

      // Perform geospatial query to find nearby hospitals within 50 km (50000 meters)
      const nearbyHospitals = await Hospital.find({
          location: {
              $near: {
                  $geometry: userLocation,
                  $maxDistance: 500000000,  // Radius in meters (50 km)
              }
          }
      })
      .limit(100)  // Limit results to 100 hospitals (can adjust as needed)
      .exec();

      // If no hospitals are found within the radius
      if (nearbyHospitals.length === 0) {
          return res.status(404).send("No hospitals found within the specified radius.");
      }

      // Send the hospitals as the response
      res.send(nearbyHospitals);
  } catch (error) {
      console.log("Error:", error.message);
      res.status(500).send("Server error");
  }

})

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});


