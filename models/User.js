const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  online: {
    type: Boolean,
    default: false,
  },
  socketid: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
