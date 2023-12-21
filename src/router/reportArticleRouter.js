const express = require("express");
const router = express.Router();
const reportArticleController = require("../controllers/reportComArticleController");

router.get("/", reportArticleController.getAllReportArticle);
router.get("/:id", reportArticleController.getReportArticle);
router.post("/", reportArticleController.createReportArticle);
router.put("/:id", reportArticleController.updateReportArticle);
router.delete("/:id", reportArticleController.deleteReportArticle);

module.exports = router;
