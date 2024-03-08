const router = require("express").Router();
const userRoutes = require("../routes/user.routes");
const chatRoutes = require("../routes/chat.routes");
const uploadRoues = require("../routes/upload.routes");
const roomRoutes = require("../routes/room.routes");

router.use("/user", userRoutes);
router.use("/chat", chatRoutes);
router.use("/file", uploadRoues);
router.use("/room", roomRoutes);

module.exports = router;
