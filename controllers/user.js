const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user &&
      res
        .status(401)
        .json({ success: false, error: "Invalid email or password" });
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json("Wrong password or username!");

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );
    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, token });
  } catch (error) {
    res.status(500).json("This is an error");
  }
});

router.post("/register", async (req, res) => {
  if (!req.body) {
    res.status(401).json({ success: false, error: "Do not send data" });
  }
  const { username, email, password } = req.body;
  const user = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
  });

  try {
    const userSaved = await user.save();
    res.status(201).json({ success: true, user: userSaved });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

module.exports = router;
