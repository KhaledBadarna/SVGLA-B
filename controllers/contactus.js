import ContactUs from "../models/contactus.js";
export const contactus = async (req, res) => {
  const { email, firstName, lastName, Message } = req.body;

  try {
    await ContactUs.create({ email: email, name: `${firstName} ${lastName}`, message: Message });
    res.status(200).json({ message: "Your message successfully sent" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log(error);
  }
};
