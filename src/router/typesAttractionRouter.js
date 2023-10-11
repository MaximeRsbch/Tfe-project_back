const express = require("express");
const router = express.Router();
const typesAttractionCtrl = require("../controllers/typesAttractionController.js");

router.get("/", typesAttractionCtrl.findAllTypesAttraction);
router.post("/", typesAttractionCtrl.createTypesAttraction);
router.get("/:id", typesAttractionCtrl.findOneTypesAttraction);
router.put("/:id", typesAttractionCtrl.updateTypesAttraction);
router.delete("/:id", typesAttractionCtrl.deleteTypesAttraction);
