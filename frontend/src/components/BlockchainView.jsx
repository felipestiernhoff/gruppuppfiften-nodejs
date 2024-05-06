import React, { useState, useEffect } from "react";
import { fetchBlockchain } from "../utils/api";

function BlockchainViewer() {
  const [blockchain, setBlockchain] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlockchainData();
  }, []);

  const fetchBlockchainData = async () => {
    setLoading(true);
    try {
      const response = await fetchBlockchain();
      setBlockchain(response);
      console.log("Fetched blockchain data:", response); // Log fetched data
    } catch (error) {
      console.error("Failed to fetch blockchain:", error);
      setError("Failed to fetch blockchain. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderLatestBlock = () => {
    if (blockchain.length === 0) {
      return <div>No blocks available</div>;
    }

    const latestBlock = blockchain[blockchain.length - 1];

    return (
      <div style={{ marginTop: "20px" }}>
        <h2>Latest Block Details</h2>
        <div>
          <strong>Index:</strong> {latestBlock.index}
        </div>
        <div>
          <strong>Timestamp:</strong> {latestBlock.timestamp}
        </div>
        <div>
          <strong>Previous Hash:</strong> {latestBlock.previousHash}
        </div>
        <div>
          <strong>Hash:</strong> {latestBlock.hash}
        </div>
        <div>
          <strong>Nonce:</strong> {latestBlock.nonce}
        </div>
        <div style={{ marginTop: "10px" }}>
          <strong>Transactions:</strong>
          {Array.isArray(latestBlock.transactions) &&
          latestBlock.transactions.length > 0 ? (
            <ul>
              {latestBlock.transactions.map((transaction, idx) => (
                <li key={idx}>
                  {typeof transaction === "object" ? (
                    <div>
                      <strong>From:</strong> {transaction.from},&nbsp;
                      <strong>To:</strong> {transaction.to},&nbsp;
                      <strong>Amount:</strong> {transaction.amount}
                    </div>
                  ) : (
                    <div>{transaction}</div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div>No transactions in this block</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <button onClick={fetchBlockchainData} disabled={loading}>
        {loading ? "Loading..." : "Refresh Blockchain"}
      </button>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
      {renderLatestBlock()}
    </div>
  );
}

export default BlockchainViewer;
