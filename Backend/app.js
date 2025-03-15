const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyparser = require("body-parser");
const sentimentRoutes = require("./routes/sentimentRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyparser.json());

app.use("/api", sentimentRoutes);

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
