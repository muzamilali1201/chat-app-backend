const uploadController = require("../controllers/uploadController");
const verifyToken = require("../middlewares/token-verification");
const upload = require("../middlewares/upload");
const router = require("express").Router();

router.post(
  "/",
  [verifyToken, upload.single("file")],
  uploadController.uploadFile
);

module.exports = router;
