const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = process.env.PORT || 8000;

(async () => {
  try {
    await connectToMongoDB("mongodb://localhost:27017/short-url");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
})();

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );
    if (entry) {
      const redirectURL = entry.redirectURL.startsWith("http://") || entry.redirectURL.startsWith("https://")
        ? entry.redirectURL
        : `http://${entry.redirectURL}`;
      res.redirect(redirectURL);
    } else {
      res.status(404).send("URL not found");
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
