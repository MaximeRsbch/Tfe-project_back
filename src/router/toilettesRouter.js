const express = require("express");
const router = express.Router();
const toilettesCtrl = require("../controllers/toilettesController.js");

router.post("/", toilettesCtrl.createToilettes);
router.get("/:id", toilettesCtrl.getAllToilettes);
router.delete("/:id", toilettesCtrl.deleteToilettes);

module.exports = router;
