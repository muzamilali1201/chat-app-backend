const Chat = require("../models/Chat");
const User = require("../models/User");
const customError = require("../utils/error");

const chatController = {
  Conversation: async (req, res) => {
    const userEmail = req.query.email;
    let userExist = await User.findOne({ email: userEmail });
    if (!userExist) {
      throw new customError(404, "User not found!");
    }
    const conversation = await Chat.find({
      $or: [
        {
          to: userEmail,
          from: req.userData.email,
        },
        { to: req.userData.email, from: userEmail },
      ],
    });
    if (conversation.length < 1) {
      throw new customError(404, "Conversation not found!");
    }
    res
      .status(200)
      .json({
        success: true,
        messages: "Successfully fetched the conversation",
        data: conversation,
      });
  },
};

module.exports = chatController;
