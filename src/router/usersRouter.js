const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/usersController.js");

router.delete("/:id", usersCtrl.deleteUser);

router.get("/:id?", usersCtrl.findUsers);

router.put("/:id", usersCtrl.modifyUser);

router.put("/mute/:id", usersCtrl.muteUser);

module.exports = router;
