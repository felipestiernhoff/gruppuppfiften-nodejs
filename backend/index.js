const express = require("express");
const app = express();
const port = 3000; 
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3001', // Allow requests from this origin
  credentials: true // Allow including cookies in requests (if applicable)
}));


app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Simplified version running np!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const blockchainRoutes = require("./routes/blockchainRoutes");
app.use("/api", blockchainRoutes);
