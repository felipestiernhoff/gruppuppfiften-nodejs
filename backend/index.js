const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // Default to 3000 if process.env.PORT is not set
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Simplified version running np!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const blockchainRoutes = require("./routes/blockchainRoutes");
app.use("/api", blockchainRoutes);
