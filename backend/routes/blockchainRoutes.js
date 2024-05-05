const express = require("express");
const router = express.Router();
const blockchainController = require("../controllers/blockchainController");

router.get("/blockchain", blockchainController.getBlockchain);
router.post("/mine", blockchainController.mineBlock);
router.post("/transactions/new", blockchainController.createTransaction);
router.post("/consensus", blockchainController.consensus);

module.exports = router;
