const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, transactions = [], previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions.length
      ? transactions
      : ["No transactions"];
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
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined: " + this.hash);
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
    // Ensure the genesis block transactions are set as an array
    return new Block(0, "01/01/2021", ["Genesis block"], "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  addTransaction(transaction) {
    console.log("Adding transaction:", transaction);
    if (!this.isValidTransaction(transaction)) {
      console.error("Invalid transaction", transaction);
      return;
    }
    this.pendingTransactions.push(transaction);
  }

  minePendingTransactions(miningRewardAddress) {
    console.log("Mining transactions:", this.pendingTransactions);
    if (!this.pendingTransactions.length) {
      console.log("No transactions to mine");
      return; // Stop the function if there are no transactions to mine
    }

    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    console.log("Block successfully mined!");
    this.chain.push(block);

    // After mining, reset pending transactions with a new reward transaction
    this.pendingTransactions = [
      {
        fromAddress: null,
        toAddress: miningRewardAddress,
        amount: this.miningReward,
      },
    ];
  }

  isValidTransaction(transaction) {
    return (
      transaction.from &&
      transaction.to &&
      typeof transaction.amount === "number" &&
      transaction.amount > 0
    );
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Blockchain;
