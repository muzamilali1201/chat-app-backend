const router = require("express").Router();
const chatController = require("../controllers/chatController");
const tokenverification = require("../middlewares/token-verification");

router.get("/", [tokenverification], chatController.Conversation);

module.exports = router;
