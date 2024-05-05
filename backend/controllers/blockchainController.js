const Blockchain = require("../models/blockchain");
const blockchain = new Blockchain();

exports.getBlockchain = (req, res) => {
  console.log(blockchain.chain); // Log the entire blockchain to inspect
  res.json(blockchain.chain);
};

exports.mineBlock = (req, res) => {
  try {
    blockchain.minePendingTransactions("reward-address");
    res.status(201).send("Block mined and added to the blockchain");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTransaction = (req, res) => {
  console.log("Received request for creating transaction:", req.body);
  try {
    const { from, to, amount } = req.body;

    // Basic validation
    if (!from || typeof from !== "string" || from.trim() === "") {
      return res.status(400).json({ message: "Invalid 'from' address." });
    }
    if (!to || typeof to !== "string" || to.trim() === "") {
      return res.status(400).json({ message: "Invalid 'to' address." });
    }
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number." });
    }

    const transaction = { from, to, amount };
    blockchain.addTransaction(transaction);
    res.json({ message: "Transaction added successfully.", transaction });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res
      .status(400)
      .json({ message: "Failed to create transaction: " + error.message });
  }
};

exports.consensus = async (req, res) => {
  const nodes = req.body.nodes;
  try {
    const replaced = await blockchain.resolveConflicts(nodes);
    if (replaced) {
      res.json({ message: "Chain was replaced", chain: blockchain.chain });
    } else {
      res.json({
        message: "Our chain is authoritative",
        chain: blockchain.chain,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.validateBlockchain = (req, res) => {
  const isValid = blockchain.isChainValid();
  res.json({ valid: isValid });
};
