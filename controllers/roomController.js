const Room = require("../models/Room");
const customError = require("../utils/error");
const crypto = require("crypto");

const roomController = {
  createRoom: async (req, res) => {
    const { roomName } = req.body;
    const { userData } = req;
    const room = new Room({
      name: roomName,
      roomId: crypto.randomBytes(16).toString("hex"),
      members: [userData._id],
      messages: {
        from: userData.email,
        message: `Room has created by ${userData.email}`,
      },
      createdBy: userData.email,
    });

    const createdRoom = await room.save();
    return res.status(200).json({
      success: true,
      message: "Room created successfully",
      data: createdRoom,
    });
  },
  joinRoom: async (req, res) => {
    const { roomid } = req.params;
    const { userData } = req;
    const roomExist = await Room.findOne({ roomId: roomid });
    if (!roomExist) {
      throw new customError(404, "Room does not exist!");
    }
    if (roomExist.members.some((member) => member == userData._id))
      throw new customError(409, "You have already joined!");
    const updateRoom = await Room.findOneAndUpdate(
      { roomId: roomid },
      { $push: { members: userData._id } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: `${userData.email} has joined the Room!`,
      data: updateRoom,
    });
  },
  leaveRoom: async (req, res) => {
    const { roomid } = req.params;
    const { userData } = req;
    const roomExist = await Room.findOne({ roomId: roomid }).populate({
      path: "members",
    });
    if (!roomExist) throw new customError(404, "Room not found!");
    if (
      roomExist.members.every(
        (member) =>
          member._id.toString() !== userData._id.toString() &&
          member.email !== roomExist.createdBy
      )
    )
      throw new customError(404, "User not exist");
    const updateRoom = await Room.findOneAndUpdate(
      { roomId: roomid },
      { $pull: { members: userData._id } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: `${userData.email} has left the room`,
      data: updateRoom,
    });
  },
  getAllJoinedRooms: async (req, res) => {
    const { userData } = req;
    const Rooms = await Room.find({ members: userData._id }).select(
      "-members -messages"
    );
    res.status(200).json({
      success: true,
      message: "Successfully fetched rooms user joined",
      data: Rooms,
    });
  },
  deleteRoom: async (req, res) => {
    const { roomid } = req.params;
    const { userData } = req;

    const room = await Room.findOne({ _id: roomid });
    if (room.createdBy !== userData.email) {
      throw new customError(401, "User is not authorized to delete this room");
    }
    await Room.findByIdAndDelete(roomid);
    res.status(204).json({
      success: true,
      message: "Room has deleted successfully",
      data: {},
    });
  },
};

module.exports = roomController;
