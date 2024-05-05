const SHA256 = require("crypto-js/sha256");
const fetch = require("node-fetch");

class Block {
  constructor(index, timestamp, transactions, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    try {
      while (
        this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
      ) {
        this.nonce++;
        this.hash = this.calculateHash();
      }
      console.log("Block mined: " + this.hash);
    } catch (error) {
      throw new Error("Failed to mine block: " + error.message);
    }
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2021", "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    try {
      newBlock.previousHash = this.getLatestBlock().hash;
      newBlock.mineBlock(this.difficulty);
      this.chain.push(newBlock);
    } catch (error) {
      throw new Error("Failed to add block: " + error.message);
    }
  }

  addTransaction(transaction) {
    console.log(transaction); // This will show what is being attempted to add
    if (!this.isValidTransaction(transaction)) {
      throw new Error("Invalid transaction");
    }
    this.pendingTransactions.push(transaction);
  }

  minePendingTransactions(miningRewardAddress) {
    try {
      let block = new Block(Date.now(), this.pendingTransactions);
      block.mineBlock(this.difficulty);

      console.log("Block successfully mined!");
      this.chain.push(block);

      this.pendingTransactions = [
        {
          fromAddress: null,
          toAddress: miningRewardAddress,
          amount: this.miningReward,
        },
      ];
    } catch (error) {
      throw new Error("Failed to mine pending transactions: " + error.message);
    }
  }

  async resolveConflicts(nodes) {
    let maxLength = this.chain.length;
    let newChain = null;

    for (const node of nodes) {
      const response = await fetch(`http://${node}/api/blockchain`);
      if (response.ok) {
        const nodeChain = await response.json();
        if (nodeChain.length > maxLength && this.isChainValid(nodeChain)) {
          maxLength = nodeChain.length;
          newChain = nodeChain;
        }
      } else {
        console.error(
          `Failed to fetch chain from node ${node}: ${response.statusText}`
        );
      }
    }

    if (newChain) {
      this.chain = newChain;
      return true;
    }
    return false;
  }

  isChainValid(chain = this.chain) {
    try {
      for (let i = 1; i < chain.length; i++) {
        const currentBlock = chain[i];
        const previousBlock = chain[i - 1];

        if (currentBlock.hash !== currentBlock.calculateHash()) {
          return false;
        }

        if (currentBlock.previousHash !== previousBlock.hash) {
          return false;
        }
      }
      return true;
    } catch (error) {
      throw new Error("Failed to validate the chain: " + error.message);
    }
  }

  isValidTransaction(transaction) {
    if (
      !transaction.from ||
      !transaction.to ||
      typeof transaction.amount !== "number" ||
      transaction.amount <= 0
    ) {
      return false;
    }
    return true;
  }
}

module.exports = Blockchain;
