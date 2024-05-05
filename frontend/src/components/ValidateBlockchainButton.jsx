import React, { useState } from "react";
import axios from "axios";

function ValidateBlockchainButton() {
  const [isValid, setIsValid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateBlockchain = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.get("http://localhost:3000/api/validate");
      setIsValid(response.data.valid);
    } catch (error) {
      console.error("Validation failed:", error);
      setErrorMessage("Failed to validate the blockchain.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={validateBlockchain} disabled={isLoading}>
        {isLoading ? "Validating..." : "Validate Blockchain"}
      </button>
      {isValid != null && !errorMessage && (
        <p>The blockchain is {isValid ? "valid" : "invalid"}!</p>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}

export default ValidateBlockchainButton;
