import Item from "../models/items.js";
import Hospital from "../models/hospital.js";

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
  try {
    const { name, quantity, expiryDate, category, status } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, quantity, expiryDate, category, status },
      { new: true }
    );
    res.status(200).json({ message: "Item updated successfully", updatedItem });
  } catch (err) {
    res.status(500).json({ error: "Error updating item" });
  }
};

export const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting item" });
  }
};
