import dotenv from "dotenv";
dotenv.config();
import cloudinary from "cloudinary";
export const CLOUDINARY_API_KEY = 627754235296785;
export const CLOUDINARY_API_SECRET = "hkQA2xxlmT79sdez60Z3__zjvXE";
export const CLOUDINARY_NAME = "dmewlyit3";
// import { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from "../config";
// const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require("../config");
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export default cloudinary;
