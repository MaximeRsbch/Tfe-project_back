const express = require("express");
const router = express.Router();
const parcCtrl = require("../controllers/parcsController.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/uploads/parc",
  filename: function (req, file, cb) {
    cb(null, "img-parc" + "-" + Date.now() + path.extname(file.originalname));
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

router.get("/all/queuetime", parcCtrl.getParksWithQueueTime);
router.get("/all", parcCtrl.getAllInformations);
// router.get("/:id?", parcCtrl.getPark);
router.get("/:id", parcCtrl.getOnePark);
router.get("/", parcCtrl.getAllParcs);
router.post("/", upload.single("img"), parcCtrl.createPark);
router.put("/", upload.single("img"), parcCtrl.updatePark);
router.get("/calendar/:id", parcCtrl.getAllCalendar);
router.post("/calendar", parcCtrl.createCalendar);
router.delete("/calendar/:id", parcCtrl.deleteCalendar);

module.exports = router;
