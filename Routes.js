const express = require("express");
const multer = require("multer");
let { videoCompressionController } = require("./controllers");
const router = express.Router();
const path = require("path");
// Configure multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Uploads will be stored in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    if (fileExtension == ".mp4") {
      cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
    }
  },
});

const upload = multer({ storage: storage });
//--------------------------------------------------------------------------------
router.post("/upload", upload.single("video"), videoCompressionController);

//--------------------------------------------------------------------------------

module.exports = { router };
