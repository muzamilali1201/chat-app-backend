const Chat = require("../models/Chat");
const User = require("../models/User");
const Room = require("../models/Room");
const customError = require("../utils/error");

const listener = () => {
  return async (socket) => {
    let userExist = await User.findOne({ email: socket.userData.email }).select(
      "-password"
    );
    if (!userExist) {
      throw new customError(404, "User not found!");
    }
    userExist.online = true;
    userExist.socketid = socket.id;
    await userExist.save();
    socket.userData = userExist;

    socket.on("disconnect", async () => {
      userExist.socketid = null;
      userExist.online = false;
      await userExist.save();
    });

    // Chat between two individuals

    socket.on("chat", async (incomingMessage) => {
      let parsedMessage = JSON.parse(incomingMessage);
      let recipientUser = await User.findOne({ email: parsedMessage.email });
      if (!recipientUser) {
        throw new customError(404, "User not exist");
      }
      const senderEmail = socket.userData.email;
      const message = new Chat({
        to: parsedMessage.email,
        from: senderEmail,
        message: parsedMessage.message,
        file: parsedMessage?.file || null,
      });
      if (recipientUser.online) {
        socket.to(recipientUser.socketid).emit("chat", { message });
      }

      await message.save();
    });

    // Join-Room

    socket.on("join-room", async (parsedRoomDetails) => {
      try {
        parsedRoomDetails = JSON.parse(parsedRoomDetails);
        const roomExist = await Room.findOne({
          roomId: parsedRoomDetails.roomId,
        }).populate({ path: "members" });
        if (
          roomExist.members.every(
            (member) => member._id.toString() !== socket.userData._id.toString()
          )
        )
          throw new Error("You are not the member of this room");

        socket.join(parsedRoomDetails.roomId);
        socket.broadcast.to(parsedRoomDetails.roomId).emit("notification", {
          message: `${socket.userData.email} has joined the room!`,
        });
      } catch (error) {
        socket.emit("error", error.message);
      }
    });

    // Group-Chat

    socket.on("group-chat", async (message) => {
      try {
        const messageDetails = JSON.parse(message);
        if (messageDetails.message.trim() == "")
          throw new Error("Please write something");
        const roomExist = await Room.findOne({ roomId: messageDetails.roomId });
        if (!roomExist) throw new Error("Room does not exist");
        if (
          roomExist.members.every(
            (member) => member._id.toString() !== socket.userData._id.toString()
          )
        )
          throw new Error("You haven't joined this room yet!");

        socket.broadcast.to(messageDetails.roomId).emit("group-chat", {
          message: messageDetails.message,
        });
        const userMessage = await Room.findOneAndUpdate(
          { roomId: messageDetails.roomId },
          {
            $push: {
              messages: {
                from: socket.userData.email,
                message: messageDetails.message,
              },
            },
          },
          { new: true }
        );
      } catch (error) {
        socket.emit("error", error.message);
      }
    });
  };
};

module.exports = listener;
