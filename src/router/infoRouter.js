const express = require("express");
const router = express.Router();
const infoCtrl = require("../controllers/infoController.js");

router.get("/all/:id", infoCtrl.getAllInfo);
router.post("/", infoCtrl.createInfo);

module.exports = router;
