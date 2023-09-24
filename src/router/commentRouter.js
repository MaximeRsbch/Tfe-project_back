const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentsController.js");

router.post("/", commentCtrl.writeCommment);

router.delete("/:id", commentCtrl.deleteOneComment);

router.get("/:id", commentCtrl.findAllComments);
