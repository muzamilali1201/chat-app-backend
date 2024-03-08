const Upload = require("../models/Upload");

const uploadController = {
  uploadFile: async (req, res) => {
    const file = req.file;
    const { title } = req.body;
    const url = `http://localhost:3000/public/uploads/${file.filename}`;
    const fileUpload = await Upload.create({
      filename: file.filename,
      title,
      url: url,
      type: file.mimetype,
    });
    res.status(200).json({
      success: true,
      message: "File has uploaded successfully!",
      data: fileUpload,
    });
  },
};

module.exports = uploadController;
