const express = require("express");
const router = express.Router();
const queuetimeCtrl = require("../controllers/queuetimeController.js");

router.get("/:id", queuetimeCtrl.queuetime);
