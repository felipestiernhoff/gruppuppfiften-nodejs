import React, { useState, useEffect } from "react";
import { fetchBlockchain } from "../utils/api";

function BlockchainViewer() {
  const [blockchain, setBlockchain] = useState([]);
  const [expandedBlocks, setExpandedBlocks] = useState(new Set());
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleFetchBlockchain();
  }, []);

  const handleFetchBlockchain = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetchBlockchain();
      setBlockchain(response);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch blockchain:", error);
      setError("Failed to fetch blockchain. Please try again.");
      setLoading(false);
    }
  };

  const toggleBlockDetail = (index) => {
    const newExpandedBlocks = new Set(expandedBlocks);
    if (newExpandedBlocks.has(index)) {
      newExpandedBlocks.delete(index);
    } else {
      newExpandedBlocks.add(index);
    }
    setExpandedBlocks(newExpandedBlocks);
  };

  const renderTransactions = (transactions) => {
    // Check if transactions exist and are in an array format
    if (!transactions || !Array.isArray(transactions)) {
      return <div>No transactions</div>;
    }

    // Map over transactions and render details
    return transactions.map((transaction, idx) => {
      if (!transaction || typeof transaction !== "object") {
        return <div key={idx}>Invalid transaction data</div>;
      }

      // Safely access properties with optional chaining
      return (
        <div
          key={idx}
          style={{
            padding: "10px",
            backgroundColor: "#f0f0f0",
            marginBottom: "5px",
          }}
        >
          <div>
            <strong>From:</strong> {transaction.fromAddress ?? "Unknown"}
          </div>
          <div>
            <strong>To:</strong> {transaction.toAddress ?? "Unknown"}
          </div>
          <div>
            <strong>Amount:</strong> {transaction.amount ?? "Unknown"}
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <button onClick={handleFetchBlockchain} disabled={loading}>
        {loading ? "Loading..." : "Refresh Blockchain"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div style={{ marginTop: "20px" }}>
        {blockchain.map((block, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ccc",
            }}
          >
            <div
              onClick={() => toggleBlockDetail(index)}
              style={{ cursor: "pointer" }}
            >
              <h2>Block {block.index}</h2>
              <div>
                <strong>Timestamp:</strong> {block.timestamp}
              </div>
              {expandedBlocks.has(index) ? (
                renderTransactions(block.transactions)
              ) : (
                <div>Click to expand</div>
              )}
            </div>
            {expandedBlocks.has(index) && (
              <>
                <div>
                  <strong>Previous Hash:</strong> {block.previousHash}
                </div>
                <div>
                  <strong>Hash:</strong> {block.hash}
                </div>
                <div>
                  <strong>Nonce:</strong> {block.nonce}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlockchainViewer;
