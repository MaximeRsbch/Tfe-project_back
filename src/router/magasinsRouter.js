const express = require("express");
const router = express.Router();
const magasinsCtrl = require("../controllers/magasinsController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/uploads/magasins",
  filename: function (req, file, cb) {
    cb(
      null,
      "img-magasins" + "-" + Date.now() + path.extname(file.originalname)
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

router.post("/", upload.single("img"), magasinsCtrl.createMagasins);
router.get("/all/:id", magasinsCtrl.getAllMagasins);
router.put("/", upload.single("img"), magasinsCtrl.updateMagasins);
router.get("/:id", magasinsCtrl.getOneMagasins);
router.delete("/:id", magasinsCtrl.deleteMagasins);

module.exports = router;
