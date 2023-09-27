const express = require("express");
const router = express.Router();
const attractionCtrl = require("../controllers/attractionsController.js");

router.get("/:id/queuetime", attractionCtrl.findAttractionQueueTime);

module.exports = router;
