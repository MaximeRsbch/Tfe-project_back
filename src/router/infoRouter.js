const express = require("express");
const router = express.Router();
const infoCtrl = require("../controllers/infoController.js");

router.get("/all/:id", infoCtrl.getAllInfo);
router.post("/", infoCtrl.createInfo);
router.delete("/:id", infoCtrl.deleteInfo);

module.exports = router;
