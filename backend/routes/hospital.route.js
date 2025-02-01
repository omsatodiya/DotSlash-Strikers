import express from "express";
import { createHospital, deleteHospital, getHospitals, updateHospital } from "../controller/hosptial.controller.js";

const router = express.Router();

router.get("/", getHospitals)

router.post("/", createHospital);

router.put("/:id", updateHospital);

router.delete("/:id", deleteHospital);

export default router;
