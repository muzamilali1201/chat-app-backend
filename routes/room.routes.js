const router = require("express").Router();
const roomController = require("../controllers/roomController");
const verifyToken = require("../middlewares/token-verification");

router.post("/", [verifyToken], roomController.createRoom);
router.post("/:roomid/join", [verifyToken], roomController.joinRoom);
router.post("/:roomid/leave", [verifyToken], roomController.leaveRoom);
router.get("/", [verifyToken], roomController.getAllJoinedRooms);
router.delete("/:roomid", [verifyToken], roomController.deleteRoom);

module.exports = router;
