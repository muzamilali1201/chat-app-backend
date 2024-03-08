const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now().toString();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage });
module.exports = upload;
