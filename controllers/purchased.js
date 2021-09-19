import User from "../models/user.js";
//post data (imgUrl, imgId) to the userSchema when the user buy an image.
export const purchasedImgs = async (req, res) => {
  const { email, imgIdUrl } = req.body;

  try {
    await User.findOneAndUpdate({ email: email }, { $addToSet: { imgIdUrl: imgIdUrl } });

    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log(error);
  }
};

//get the images the user bought (imgUrl,imgId)

export const getImages = async (req, res) => {
  const email = req.params.email;

  try {
    await User.findOne({ email: email }, function (err, obj) {
      res.status(200).json(obj.imgIdUrl);
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log(error);
  }
};
