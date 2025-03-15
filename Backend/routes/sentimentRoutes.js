const express = require("express");
const router = express.Router();
const { exec } = require("child_process");

// Sentiment analysis route
router.post("/analyze", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  // Call Python script to analyze sentiment
  exec(`python3 python/sentiment.py "${text}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res
        .status(500)
        .json({ error: `Internal server error: ${error.message}` });
    }

    // Filter out unnecessary NLTK stderr messages
    if (
      stderr &&
      !stderr.includes("Package vader_lexicon is already up-to-date")
    ) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).json({ error: `Python stderr: ${stderr}` });
    }

    console.log(`stdout: ${stdout}`);

    // Try parsing the output as JSON
    try {
      const result = JSON.parse(stdout);
      res.json(result);
    } catch (parseError) {
      console.error(`JSON parsing error: ${parseError}`);
      return res
        .status(500)
        .json({ error: "Failed to parse Python output as JSON" });
    }
  });
});

module.exports = router;
