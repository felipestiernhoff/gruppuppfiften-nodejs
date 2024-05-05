const Blockchain = require("../models/blockchain");
const blockchain = new Blockchain();

exports.getBlockchain = (req, res) => {
  res.json(blockchain.chain);
};

exports.mineBlock = (req, res) => {
  try {
    // This assumes that you only call addTransaction for valid transactions
    // and that the reward to the miner is handled separately.
    blockchain.minePendingTransactions("reward-address"); // Reward logic needs to be properly integrated
    res.status(201).send("Block mined and added to the blockchain");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTransaction = (req, res) => {
  console.log("Received request for creating transaction");
  try {
    const { from, to, amount } = req.body;
    const transaction = { from, to, amount };
    blockchain.addTransaction(transaction);
    res.json({ message: "Transaction added successfully.", transaction });
  } catch (error) {
    res.status(400).json({ message: error.message });
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
