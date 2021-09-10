import express from "express";
import { purchasedImgs, getImages } from "../controllers/purchased.js";

const router = express.Router();
router.post("", purchasedImgs);
router.get("/images/:email", getImages);

export default router;
