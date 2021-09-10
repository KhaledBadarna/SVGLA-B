import express from "express";
const router = express.Router();
import { getImagesBySearch, getImages, uploadImage, getImage } from "../controllers/images.js";
import auth from "../middleware/auth.js";

router.get("/search/:tag", getImagesBySearch);
router.get("", getImages);
router.get("/id/SVGLA/:imageId", getImage);
router.post("/upload", auth, uploadImage);

export default router;
