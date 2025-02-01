import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  hospitalid: {
    type: String,
  },
  name: { 
    type: String, 
    required: true 
    }, // Hospital name
  email: { 
    type: String, 
    required: true,
     unique: true 
    }, // Hospital email
  password: { 
    type: String, 
    required: true
 }, // Hospital password (hashed)
  location: {
    type: { type: String, default: "Point" }, // GeoJSON type
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  contact: { type: String, required: true }, // Hospital contact number
}, {
    timestamps: true
});

// Index for geospatial queries

hospitalSchema.index({ location: "2dsphere" });

const Hospital = mongoose.model("Hospital", hospitalSchema);

export default Hospital;
