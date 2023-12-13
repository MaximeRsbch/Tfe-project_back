const express = require("express");
const router = express.Router();
const modoParcCtrl = require("../controllers/modoParcController");

router.post("/", modoParcCtrl.createModoParc);
router.get("/", modoParcCtrl.getAllModoParcs);
router.delete("/:id", modoParcCtrl.deleteModoParc);
router.get("/all/:id", modoParcCtrl.getAllModoParcsByParc);

module.exports = router;
