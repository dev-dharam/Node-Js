const express = require('express');
const URLModel = require('../models/urlModel');
const router = express.Router();

router.get("/", async (req, res) => {
    const allurls = await URLModel.find()
    res.render("home", {urls: allurls});
})

module.exports = router;
