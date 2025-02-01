import Hopsital from "../models/hospital.js";
import mongoose from "mongoose";

export const getHospitals = async (req, res) => {
    try {
        const hopsitals = await Hopsital.find({});
        res.status(200).json({success: true, data: hopsitals});
    } catch (error) {
        console.log("error" + error.message);
    }
}

export const createHospital = async (req, res) => {
    const hospital = req.body;
    
    if(!hospital.name || !hospital.email || !hospital.password || !hospital.contact)
    {
        return res.send(400).json({success: false, message: "fill everything"});
    }
    const newHospital = new Hopsital(hospital);
    try {
        await newHospital.save();
        res.status(201).json({ success: true, data: newHospital});
    } catch (error) {
        console.log("error: " + error.message);
        res.status(500).json({success: false, message: "server error"});
    }
}

export const updateHospital = async (req, res) => {
    const {id} = req.params;
    const hospital = req.body;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({success: false, message: "invalid hosptial"})
    }
    // here email has to unique so if after editing current email it puts it to an existing one, server error will be catched below 
    try {
        const updatedHospital = await Hopsital.findByIdAndUpdate(id, hospital, {new: true});
        res.status(200).json({success: true, data: updatedHospital});
    } catch (error) {
        console.log("error " + error.message);
        res.status(500).json({success: false, message: "server error"});
    }
}

export const deleteHospital = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({success: false, message: "invalid hosptial"})
    }
    try {
        await Hopsital.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "hospital deleted"});
    } catch (error) {
        res.status(500).json({success: false, message: "server error"});
        console.log("error" + error.message);
    }
}