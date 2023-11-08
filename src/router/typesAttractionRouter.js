const express = require("express");
const router = express.Router();
const typesAttractionCtrl = require("../controllers/typesAttractionController.js");

router.get("/", typesAttractionCtrl.findAllTypesAttraction);

router.post("/", typesAttractionCtrl.createTypesAttraction);

router.get("/:id", typesAttractionCtrl.findOneTypesAttraction);

module.exports = router;
