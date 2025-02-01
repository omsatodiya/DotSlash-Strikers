import Hospital from "../models/hospital.js";
import mongoose from "mongoose";
import { clerkClient } from "@clerk/express"; // Use the correct import

export const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find({});
    res.status(200).json({ success: true, data: hospitals });
  } catch (error) {
    console.log("error: " + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createHospital = async (req, res) => {
  const hospital = req.body;

  if (
    !hospital.name ||
    !hospital.email ||
    !hospital.password ||
    !hospital.contact
  ) {
    return res.status(400).json({ success: false, message: "Fill all fields" });
  }

  const newHospital = new Hospital(hospital);
  try {
    await newHospital.save();
    res.status(201).json({ success: true, data: newHospital });
  } catch (error) {
    console.log("error: " + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateHospital = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid hospital ID" });
  }

  try {
    // Fetch the Clerk user
    const clerkUser = await clerkClient.users.getUser(userId);
    console.log("Clerk User:", clerkUser);

    // Update the hospital with the Clerk user data (if needed)
    const updatedHospital = await Hospital.findByIdAndUpdate(
      id,
      { ...req.body, clerkUserId: userId }, // Optionally store the Clerk user ID
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedHospital });
  } catch (error) {
    console.log("error: " + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteHospital = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid hospital ID" });
  }

  try {
    await Hospital.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Hospital deleted" });
  } catch (error) {
    console.log("error: " + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
