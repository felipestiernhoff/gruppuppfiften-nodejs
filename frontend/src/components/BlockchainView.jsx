import React, { useState } from "react";
import { fetchBlockchain } from "../utils/api";

function BlockchainViewer() {
  const [blockchain, setBlockchain] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      <h1>Blockchain</h1>
      <button onClick={handleFetchBlockchain} disabled={loading}>
        {loading ? "Loading..." : "Fetch Blockchain"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
            <h2>Block {block.index}</h2>
            <p>
              <strong>Timestamp:</strong> {block.timestamp}
            </p>
            <p>
              <strong>Transactions:</strong>{" "}
              {block.transactions.length > 0
                ? JSON.stringify(block.transactions)
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
        ))}
      </div>
    </div>
  );
}

export default BlockchainViewer;
