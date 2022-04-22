const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.find({ email });
  const correctPass = !user
    ? false
    : await bcrypt.compare(password, user.password);

  if (!(user && correctPass)) {
    res.status(401).json({
      error: "Invalid email or password",
    });
  }
  const userForToken = {
    id: user._id,
    email: user.email,
  };

  const token = jwt.sign(userForToken, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 24 * 7,
  });

  res
    .status(201)
    .json({
      success: true,
      user: { username: user.username, token, id: user._id },
    });
});

router.post("/register", async (req, res) => {
  if (!req.body) {
    res.status(401).json({ success: false, error: "Do not send data" });
  }
  const { username, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS);

  const user = new User({ username, email, hashPassword });

  try {
    const userSaved = await user.save();
    res.status(201).json({ success: true, user: userSaved });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

module.exports = router;
