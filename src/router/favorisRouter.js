const express = require("express");
const router = express.Router();
const favorisCtrl = require("../controllers/favorisController.js");

router.get("/all/:id", favorisCtrl.getAllFavoris);
router.post("/", favorisCtrl.createFavoris);

module.exports = router;
