const Chat = require("../models/Chat");
const User = require("../models/User");
const Room = require("../models/Room");
const customError = require("../utils/error");
const crypto = require("crypto");

const listener = (io) => {
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

    socket.on("chat", async (response, res) => {
      let messageToSend = JSON.parse(response);
      let onlineUser = await User.findOne({ email: messageToSend.email });
      const message = new Chat({
        to: messageToSend.email,
        from: socket.userData.email,
        message: messageToSend.message,
        file: messageToSend?.file?._id || null,
      });
      if (!onlineUser.online) {
        if (!message) {
          throw new customError(500, "Something went wrong");
        }
        return await message.save();
      }

      socket.to(onlineUser.socketid).emit("chat", { message });
      await message.save();
    });

    // Room joining

    socket.on("join-room", async (roomDetails) => {
      try {
        roomDetails = JSON.parse(roomDetails);
        const roomExist = await Room.findOne({
          roomId: roomDetails.roomId,
        }).populate({ path: "members" });
        if (
          roomExist.members.every(
            (elem) => elem._id.toString() !== socket.userData._id.toString()
          )
        )
          throw new Error("You are not the member of this room");

        socket.join(roomDetails.roomId);
        socket.broadcast.to(roomDetails.roomId).emit("notification", {
          message: `${socket.userData.email} has joined the room!`,
        });
      } catch (error) {
        socket.emit("error", error.message);
      }
    });

    // Chatting

    socket.on("group-chat", async (message) => {
      try {
        const messageDetails = JSON.parse(message);
        if (messageDetails.message == "")
          throw new Error("Please write something");
        const roomExist = await Room.findOne({ roomId: messageDetails.roomId });
        if (!roomExist) throw new Error("Room does not exist");
        if (
          roomExist.members.every(
            (elem) => elem._id.toString() !== socket.userData._id.toString()
          )
        )
          throw new Error("You haven't joined this room yet!");
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

        socket.broadcast.to(messageDetails.roomId).emit("notification", {
          message: userMessage.messages,
        });
      } catch (error) {
        socket.emit("error", error.message);
      }
    });
  };
};

module.exports = listener;
