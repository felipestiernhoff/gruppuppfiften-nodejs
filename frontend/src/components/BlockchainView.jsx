import React, { useState, useEffect } from "react";
import { fetchBlockchain } from "../utils/api";
import "./BlockchainViewer.css"; // Import CSS file for custom styles

function BlockchainViewer() {
  const [blockchain, setBlockchain] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);

  useEffect(() => {
    fetchBlockchainData();
  }, []);

  const fetchBlockchainData = async () => {
    setLoading(true);
    try {
      const response = await fetchBlockchain();
      setBlockchain(response);
      console.log("Fetched blockchain data:", response);
    } catch (error) {
      console.error("Failed to fetch blockchain:", error);
      setError("Failed to fetch blockchain. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderBlock = (block) => {
    return (
      <div className="block-details-container">
        <h2>Block Details</h2>
        <div>
          <strong>Index:</strong> {block.index}
        </div>
        <div>
          <strong>Timestamp:</strong> {block.timestamp}
        </div>
        <div>
          <strong>Previous Hash:</strong> {block.previousHash}
        </div>
        <div>
          <strong>Hash:</strong> {block.hash}
        </div>
        <div>
          <strong>Nonce:</strong> {block.nonce}
        </div>
        <div className="transaction-list">
          <strong>Transactions:</strong>
          {Array.isArray(block.transactions) && block.transactions.length > 0 ? (
            <ul>
              {block.transactions.map((transaction, idx) => (
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

  const handlePrevBlock = () => {
    if (currentBlockIndex > 0) {
      setCurrentBlockIndex(currentBlockIndex - 1);
    }
  };

  const handleNextBlock = () => {
    if (currentBlockIndex < blockchain.length - 1) {
      setCurrentBlockIndex(currentBlockIndex + 1);
    }
  };

  return (
    <div className="blockchain-viewer-container">
      <button onClick={fetchBlockchainData} disabled={loading}>
        {loading ? "Loading..." : "Refresh Blockchain"}
      </button>
      {error && <div className="error-message">{error}</div>}
      {blockchain.length === 0 ? (
        <div className="no-blocks-message">No blocks available</div>
      ) : (
        <div className="block-container">
          <div className="navigation-buttons">
            <button onClick={handlePrevBlock} className="nav-button">
              Previous Block
            </button>
            <button onClick={handleNextBlock} className="nav-button">
              Next Block
            </button>
          </div>
          {renderBlock(blockchain[currentBlockIndex])}
        </div>
      )}
    </div>
  );
}

export default BlockchainViewer;
