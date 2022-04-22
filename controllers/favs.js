const express = require("express");
const Fav = require("../models/Fav");
const User = require("../models/User");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();

router.post("/", isAuthenticated, async (req, res) => {
  if (!req.body) {
    return res
      .statusCode(401)
      .json({ success: false, error: "Required FAV field is missing" });
  }
  const { userId, title, description, link } = req.body;
  const user = await User.findById(userId);

  const newFav = new Fav({
    title,
    description,
    link,
    date: new Date(),
    user: user._id,
  });

  try {
    const savedFav = await newFav.save();
    user.favs = user.favs.concat(savedFav._id);
    await user.save();

    res.status(201).json({ success: true, fav: savedFav });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const favs = await Fav.find({}).populate("user");
    res.status(201).json({ success: true, favs });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

router.get("/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(401).json({ success: false, error: "Required ID params" });
  }
  try {
    const fav = await Fav.findById(id);
    res.status(201).json({ success: true, fav });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

router.delete("/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(401).json({ success: false, error: "Required ID params" });
  }
  try {
    await Fav.findByIdAndDelete(id);
    res.status(204).json({ success: true, message: "Fav deleted" });
  } catch (error) {
    res.status(404).json({ success: false, error });
  }
});

module.exports = router;
