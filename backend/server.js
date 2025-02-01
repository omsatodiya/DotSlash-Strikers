import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import HospitalRoutes from "./routes/hospital.route.js";
import ItemRoutes from "./routes/items.route.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/hospital", HospitalRoutes);

app.use("/api/item", ItemRoutes)

app.get("/", (req, res ) => {
    res.send("here");
})


app.listen(5000, () => {
    connectDB();
    console.log("it really is happening");
})

// bis3pkw2YYX984Up

// mongodb+srv://realgovindkrishna:<db_password>@strikers.tjkvd.mongodb.net/?retryWrites=true&w=majority&appName=Strikers