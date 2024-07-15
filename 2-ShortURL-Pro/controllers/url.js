const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const shortID = shortid.generate();
    await URL.create({
      shortId: shortID,
      redirectURL: url,
      visitHistory: [],
    });
    return res.json({ id: shortID });
  } catch (error) {
    console.error("Error generating new short URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleGetAnalytics(req, res) {
  const { shortId } = req.params;

  try {
    const result = await URL.findOne({ shortId });
    if (result) {
      return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
      });
    } else {
      return res.status(404).json({ error: "Short URL not found" });
    }
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
