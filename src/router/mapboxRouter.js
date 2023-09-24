const express = require("express");
const router = express.Router();
const mapboxCtrl = require("../controllers/mapboxController.js");

router.get("/:query", mapboxCtrl.mapboxSearch);
