import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  message: { type: String },
  id: { type: String },
});
export default mongoose.model("ContactUs", contactSchema);
