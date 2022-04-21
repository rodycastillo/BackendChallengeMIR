const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.SchemaTypes.ObjectId,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    favs: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
