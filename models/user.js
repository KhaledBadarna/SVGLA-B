import mongoose from "mongoose";
//website users
const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String },
  imgIdUrl: [{ imgId: String, imgUrl: String }],
  isVarified: { type: Boolean },
  id: { type: String },
});
export default mongoose.model("User", userSchema);
