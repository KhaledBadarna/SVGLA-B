import cloudinary from "../utils/cloudinary.js";
import express from "express";
const router = express.Router();

export const getImages = async (req, res) => {
  try {
    const { resources } = await cloudinary.v2.search.expression("folder:SVGLA").sort_by("public_id", "desc").max_results(200).execute();
    const publicIds = resources.map((file) => file.public_id);
    const imgUrl = resources.map((file) => file.secure_url);

    res.send({ publicIds: publicIds, imgUrl: imgUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getImage = async (req, res) => {
  const imageId = req.params.imageId;

  try {
    const resources = cloudinary.v2.search
      .expression("resource_type:image AND public_id=SVGLA/" + imageId)

      .execute()
      .then((result) => {
        const publicIds = result.resources.map((file) => file.public_id);
        const imgUrl = result.resources.map((file) => file.secure_url);

        res.send({ publicIds: publicIds, imgUrl: imgUrl });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getImagesBySearch = async (req, res) => {
  const tags = req.params.tag;
  const splitted = tags?.split(",");
  const searchTags = splitted?.join(" || ");

  try {
    const resources = cloudinary.v2.search
      .expression("resource_type:image AND tags=" + searchTags)
      .execute()
      .then((result) => {
        let publicIds = result.resources.map((file) => file.public_id);

        if (!publicIds[0]) {
          publicIds.push(0);
          res.send(publicIds);
        } else {
          // console.log("hhh");
          res.send(publicIds);
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const uploadImage = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, { upload_preset: "SVGLA" });
    console.log(uploadedResponse);
    res.json({ msg: "yayayay" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "something went wrong" });
  }
};

export default router;
