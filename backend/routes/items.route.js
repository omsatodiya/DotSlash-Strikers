import express from "express";
import { authorizeHospital, getAllItems, getItemById, updateItem, deleteItem, addItem } from "../controller/items.controller.js";

const router = express.Router();

router.get("/", getAllItems);

router.get("/:id", getItemById);

router.post("/", addItem);

router.put("/:id", authorizeHospital, updateItem);

router.delete("/:id", authorizeHospital, deleteItem);

export default router;

