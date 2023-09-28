const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/authController.js");

router.post("/login", authCtrl.login);

router.post("/register", authCtrl.register);

router.post("/verify/:id/:token", authCtrl.verifyEmail);

module.exports = router;
