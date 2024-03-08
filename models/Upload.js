const mongoose = require("mongoose");

const uploadSchema = mongoose.Schema({
  filename: String,
  title: String,
  url: String,
  type: String,
});

module.exports = mongoose.model("Upload", uploadSchema);
