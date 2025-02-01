import express from "express";
import Hopsital from "../models/hospital.js";
import mongoose from "mongoose";
import { createHospital, deleteHospital, getHospitals, updateHospital } from "../controller/hosptial.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("reached get");
});

router.get("/hospital", getHospitals)

router.post("/hospital", createHospital);

router.put("/hospital/:id", updateHospital);

router.delete("/hospital/:id", deleteHospital);

export default router;
