import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  category: { type: String, required: true },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  status: { type: String, default: "available" },
  price: { type: Number, required: true },
  imageURL: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const items = mongoose.model("Item", itemSchema);
export default items;
