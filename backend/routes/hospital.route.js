import express from "express";
import Hospital from "../models/hospital.js";
import mongoose from "mongoose";
import {
  createHospital,
  deleteHospital,
  getHospitals,
  updateHospital,
  getHospitalById,
} from "../controller/hosptial.controller.js";

const router = express.Router();

router.get("/",  getHospitals);

router.get("/:id", getHospitalById);

router.post("/", createHospital);

router.put("/:id", updateHospital);

router.delete("/:id", deleteHospital);

export default router;
