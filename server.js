import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import imageRoutes from "./routes/images.js";
import userRoutes from "./routes/users.js";
import purchasedRoutes from "./routes/purchased.js";
import config, { PORT } from "./config.js";

const app = express();
app.use(cors());
dotenv.config();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
  res.send("hello to Svgla API");
});
app.use("/images/", imageRoutes);
app.use("/user", userRoutes);
app.use("/purchased", purchasedRoutes);
// const PORT = process.env.PORT || 4000;
mongoose
  .connect(config.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))

  .catch((error) => console.log("error", error.message));
mongoose.set("useFindAndModify", false);
