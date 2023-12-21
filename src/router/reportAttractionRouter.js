const express = require("express");
const router = express.Router();
const ReportComAttrController = require("../controllers/reportComAttrController.js");

router.get("/", ReportComAttrController.getAllReportAttr);
router.get("/:id", ReportComAttrController.getReportAttr);
router.post("/", ReportComAttrController.createReportAttr);
router.delete("/:id", ReportComAttrController.deleteReportAttr);

module.exports = router;
