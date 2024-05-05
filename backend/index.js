const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const blockchainRoutes = require("./routes/blockchainRoutes");

app.use(
  cors({
    origin: "http://localhost:3001", // Adjust if your frontend is on a different port
    credentials: true,
  })
);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Simplified version running np!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use("/api", blockchainRoutes);
