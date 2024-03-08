const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  name: String,
  roomId: String,
  members: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      from: String,
      message: String,
      to: {
        type: String,
        default: "all",
      },
      time: {
        type: Date,
        default: Date.now(),
      },
      roomName: String,
    },
  ],
  createdBy: String,
});

module.exports = mongoose.model("Room", roomSchema);
