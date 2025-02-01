import Item from "../models/items.js";
import Hospital from "../models/hospital.js";
import mongoose from "mongoose";
import items from "../models/items.js";

export const authorizeHospital = async (req, res, next) => {
  const { id } = req.params;
  const hospitalId = req.user.id;

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (item.hospitalId.toString() !== hospitalId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to modify this item" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: "Error authorizing hospital" });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const { category, status, nearby } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;

    if (nearby) {
      const [latitude, longitude] = nearby.split(",");
      const hospitals = await Hospital.find({
        location: {
          $near: {
            $geometry: { type: "Point", coordinates: [longitude, latitude] },
            $maxDistance: 10000,
          },
        },
      });

      const hospitalIds = hospitals.map((h) => h._id);
      filter.hospitalId = { $in: hospitalIds };
    }

    const items = await Item.find(filter).populate(
      "hospitalId",
      "name location contact"
    );
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: "Error fetching items" });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate(
      "hospitalId",
      "name location contact"
    );
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: "Error fetching item" });
  }
};

export const updateItem = async (req, res) => {
  const {id} = req.params;
  const item = req.body;
  if(!mongoose.Types.ObjectId.isValid(id))
  {
    return res.status(404).json({success: false, message: "invalid item"});
  }

  try {
    const updatedItem = await items.findByIdAndUpdate(id, item, {new: true});
    res.status(200).json({success: true, data: updateItem})
  } catch (error) {
    console.log("error " + error.message);
    res.status(500).json({success: false, message: "server error"});
  }
  // try {
  //   const { name, quantity, expiryDate, category, status } = req.body;
  //   const updatedItem = await Item.findByIdAndUpdate(
  //     req.params.id,
  //     { name, quantity, expiryDate, category, status },
  //     { new: true }
  //   );
  //   res.status(200).json({ message: "Item updated successfully", updatedItem });
  // } catch (err) {
  //   res.status(500).json({ error: "Error updating item" });
  // }
};

export const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting item" });
  }
};

// Add a new item
export const addItem = async (req, res) => {
  const { name, quantity, expiryDate, category, hospitalId } = req.body;

  try {
    // Validate required fields
    if (!name || !quantity || !expiryDate || !category || !hospitalId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new item
    const newItem = new Item({
      name,
      quantity,
      expiryDate,
      category,
      hospitalId,
    });

    // Save the item to the database
    await newItem.save();

    // Respond with the created item
    res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (err) {
    res.status(500).json({ error: "Error adding item" });
  }
};
