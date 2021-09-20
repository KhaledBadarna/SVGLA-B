import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";

import User from "../models/user.js";
import nodemailer from "nodemailer";

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "svglineart@gmail.com",
    pass: "sltehlwiiykrehnk",
  },
});

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

    if (!existingUser.isVarified) return res.status(404).json({ message: "User is not verified" });
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, config.SECRET, { expiresIn: "1h" });
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, name, googleId } = req.body;

  if (googleId) {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exist" });
      const result = await User.create({ email, name: `${name}`, isVarified: true });
      const token = jwt.sign({ email: result.email, id: result._id }, config.SECRET, { expiresIn: "1h" });

      res.status(200).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong." });
      console.log(error);
    }
  } else {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exist" });
      if (password !== confirmPassword) return res.status(400).json({ message: "Passwords Don't match" });
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, isVarified: false });
      const token = jwt.sign({ email: result.email, id: result._id }, config.SECRET, { expiresIn: "1h" });

      let mailDetails = {
        from: "svglalineart@gmail.com",
        to: email,
        subject: "SVGLA email account verification",
        html: `<a href="http://localhost:3000/verify/user/${token}">click here to verify your account</a><br><p>have a nice day</p>`,
      };
      //localhost:3000 must be change to SVGLA.com ?
      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log("Error Occurs");
        } else {
          console.log("Email sent successfully");
        }
      });
      res.status(200).json({ message: "Account created successfully please check your email" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong." });
      console.log(error);
    }
  }
};

export const verify = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, config.SECRET);

    let email = decoded.email;

    let user = await User.findOne({ email: email });

    if (user.isVarified) {
      return res.send("Already verified");
    } else {
      user.isVarified = true;
      user.save();
      return res.send("Verified");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
