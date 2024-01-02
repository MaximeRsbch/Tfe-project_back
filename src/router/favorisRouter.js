const express = require("express");
const router = express.Router();
const favorisCtrl = require("../controllers/favorisController.js");

router.get("/all/:id", favorisCtrl.getAllFavoris);
router.post("/", favorisCtrl.createFavoris);
router.delete("/:id", favorisCtrl.deleteFavoris);
router.delete("/all/:id", favorisCtrl.deleteAllFavoris);

module.exports = router;
