const express = require("express");
const router = express.Router();
const parcCtrl = require("../controllers/parcsController.js");

router.get("/all/queuetime", parcCtrl.getParksWithQueueTime);
router.get("/all", parcCtrl.getAllInformations);
router.get("/:id?", parcCtrl.getPark);
router.post("/", parcCtrl.createPark);
router.put("/", parcCtrl.updatePark);
router.delete("/:id", parcCtrl.deletePark);

module.exports = router;
