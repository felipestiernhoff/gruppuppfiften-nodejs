import React, { useState } from "react";
import axios from "axios";

function MineBlockButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const mineBlock = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      const response = await axios.post("http://localhost:3000/api/mine");
      setMessage("Block successfully mined! Hash: " + response.data.hash);
    } catch (error) {
      console.error("Error mining block:", error);
      setMessage("Failed to mine block: " + error.message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <button onClick={mineBlock} disabled={isLoading}>
        {isLoading ? "Mining..." : "Mine a Block"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default MineBlockButton;
