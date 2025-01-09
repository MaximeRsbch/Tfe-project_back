const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/usersController.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/uploads/user",
  filename: function (req, file, cb) {
    cb(
      null,
      "img-userprofile" + "-" + Date.now() + path.extname(file.originalname)
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

router.delete("/:id", usersCtrl.deleteUser);

router.get("/", usersCtrl.findUsers);

router.get("/:id", usersCtrl.findUsersById);

router.put(
  "/:id",
  upload.fields([
    { name: "img", maxCount: 1 }, // Profil image
    { name: "background", maxCount: 1 }, // Image de fond
  ]),
  usersCtrl.modifyUser
);

router.put("/mute/:id", usersCtrl.muteUser);

router.put("/role/:id", usersCtrl.changeRole);

module.exports = router;
