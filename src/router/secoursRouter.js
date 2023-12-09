const express = require("express");
const router = express.Router();
const secoursCtrl = require("../controllers/secoursController.js");

router.post("/", secoursCtrl.addSecours);
router.delete("/:id", secoursCtrl.deleteSecours);
router.put("/:id", secoursCtrl.updateSecours);
router.get("/all/:id", secoursCtrl.getSecours);

module.exports = router;
