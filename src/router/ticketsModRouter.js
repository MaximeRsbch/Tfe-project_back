const express = require("express");
const router = express.Router();
const ticketsModCtrl = require("../controllers/ticketsModController.js");

router.get("/:id", ticketsModCtrl.getAllTicketsMod);
router.post("/", ticketsModCtrl.createTicketsMod);
router.delete("/:id", ticketsModCtrl.deleteTicketsMod);
router.put("/:id", ticketsModCtrl.updateTicketsMod);
