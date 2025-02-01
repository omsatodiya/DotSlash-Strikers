import express from "express";
import {
  authorizeHospital,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} from "../controllers/items.controller.js";

const router = express.Router();

router.get("/", getAllItems);

router.get("/:id", getItemById);

router.put("/:id", authorizeHospital, updateItem);

router.delete("/:id", authorizeHospital, deleteItem);

export default router;
