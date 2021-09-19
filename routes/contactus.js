import express from "express";
const router = express.Router();

import { contactus } from "../controllers/contactus.js";
router.post("", contactus);

export default router;
