const express = require("express");
const router = express.Router();
const modoCtrl = require("../controllers/modoController");

router.post("/", modoCtrl.createModo);
router.get("/", modoCtrl.getAllModos);
router.delete("/:id", modoCtrl.deleteModo);

module.exports = router;
