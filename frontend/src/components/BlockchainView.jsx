import React, { useState, useEffect } from "react";
import { fetchBlockchain } from "../utils/api";

function BlockchainViewer() {
  const [blockchain, setBlockchain] = useState([]);
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
      setBlockchain(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch blockchain:", error);
      setError("Failed to fetch blockchain. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleFetchBlockchain} disabled={loading}>
        {loading ? "Loading..." : "Refresh Blockchain"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ marginTop: "20px" }}>
        {blockchain.length > 0 ? (
          blockchain.map((block, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            >
              <h2>Block {block.index}</h2>
              <p>
                <strong>Timestamp:</strong> {block.timestamp}
              </p>
              <p>
                <strong>Transactions:</strong>
                {block.transactions.length > 0
                  ? JSON.stringify(block.transactions, null, 2) // Make JSON output more readable
                  : "No transactions"}
              </p>
              <p>
                <strong>Previous Hash:</strong> {block.previousHash}
              </p>
              <p>
                <strong>Hash:</strong> {block.hash}
              </p>
              <p>
                <strong>Nonce:</strong> {block.nonce}
              </p>
            </div>
          ))
        ) : (
          <p>No blocks in the blockchain.</p>
        )}
      </div>
    </div>
  );
}

export default BlockchainViewer;
