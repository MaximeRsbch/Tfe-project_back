const express = require("express");
const router = express.Router();
const articlesCtrl = require("../controllers/articleController.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, "image" + "-" + Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 15000000, // 150 KB for a 1080x1080 JPG 90
  },
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
}

router.post("/", upload.array("uploadedImages", 2), articlesCtrl.createArticle);

router.delete("/:id", articlesCtrl.deleteArticle);

router.get("/:id?", articlesCtrl.getArticles);

module.exports = router;
