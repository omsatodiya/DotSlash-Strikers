import Hospital from "../models/hospital.js";
import mongoose from "mongoose";

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

// get hospital by id
export const getHospitalById = async (req, res) => {
  const { id } = req.params;
  try {
    const hospital = await Hospital.findById(id);
    res.status(200).json({ success: true, data: hospital });
  } catch (error) {
    console.log("error: " + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ... existing code ...

export const updateHospital = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid hospital ID" });
  }

  try {
    // Get user details from Clerk
    const user = await clerkClient.users.getUser(userId);
    const userDetails = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddresses[0]?.emailAddress || "No email provided",
    };

    const updatedHospital = await Hospital.findByIdAndUpdate(
      id,
      {
        ...req.body,
        clerkUserId: userId,
        clerkUserDetails: userDetails, // Store simplified user details
      },
      { new: true }
    );

    if (!updatedHospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    res.status(200).json({ success: true, data: updatedHospital });
  } catch (error) {
    console.error("Clerk/Database Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ... existing code ...

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
