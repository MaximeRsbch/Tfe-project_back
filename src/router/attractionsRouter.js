const express = require("express");
const router = express.Router();
const attractionCtrl = require("../controllers/attractionsController.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/uploads/attraction",
  filename: function (req, file, cb) {
    cb(
      null,
      "img-attraction" + "-" + Date.now() + path.extname(file.originalname)
    );
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

router.get("/:id/queuetime", attractionCtrl.findAttractionQueueTime);

router.post("/img", upload.single("img"), attractionCtrl.createImgAttraction);

router.post("/", attractionCtrl.createAttraction);

router.get("/", attractionCtrl.findAllAttractions);

router.get("/:id/all", attractionCtrl.findAttraction);

router.get("/:id", attractionCtrl.findAttractionById);

router.put("/:id", upload.single("img"), attractionCtrl.updateAttraction);

router.delete("/:id", attractionCtrl.deleteAttraction);

module.exports = router;
