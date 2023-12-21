const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/usersController.js");

router.delete("/:id", usersCtrl.deleteUser);

router.get("/", usersCtrl.findUsers);

router.get("/:id", usersCtrl.findUsersById);

router.put("/:id", usersCtrl.modifyUser);

router.put("/mute/:id", usersCtrl.muteUser);

router.put("/role/:id", usersCtrl.changeRole);

module.exports = router;
