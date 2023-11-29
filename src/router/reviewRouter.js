const express = require("express");
const router = express.Router();
const reviewCtrl = require("../controllers/reviewController.js");

router.post("/", reviewCtrl.addReview);

router.delete("/:id", reviewCtrl.deleteReview);

router.put("/:id", reviewCtrl.updateReview);

router.get("/:id", reviewCtrl.findAllReviews);

module.exports = router;
