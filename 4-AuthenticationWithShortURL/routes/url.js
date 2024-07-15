const express = require("express");
const { handleURLGenerator, handleAnalytics } = require("../controllers/urlControler");
const router = express.Router();

router.post("/", handleURLGenerator);

router.get("/analytics/:shortId", handleAnalytics);

module.exports = router;