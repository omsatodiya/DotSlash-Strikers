import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("reached get");
});

router.post("/", (req, res) => {
    res.send("post reached");
});

export default router;
