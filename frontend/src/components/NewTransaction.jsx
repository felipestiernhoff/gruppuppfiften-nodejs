import React, { useState } from "react";
import { createTransaction } from "../utils/api";

function TransactionForm() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    amount: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue) && numericValue > 0) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: numericValue,
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [name]: "", // Reset or handle invalid input appropriately
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.amount <= 0) {
      console.log("Validation error: Amount must be positive.");
      return; // Prevent form submission if validation fails
    }
    try {
      await createTransaction(formData);
      setMessage("Transaction successfully created!");
      setFormData({ from: "", to: "", amount: "" }); // Reset form
    } catch (error) {
      setMessage("Failed to create transaction.");
      console.error(
        "Transaction creation failed:",
        error.response?.data || error
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="from"
        value={formData.from}
        onChange={handleChange}
        placeholder="From address"
      />
      <input
        type="text"
        name="to"
        value={formData.to}
        onChange={handleChange}
        placeholder="To address"
      />
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
      />
      <button type="submit">Submit Transaction</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default TransactionForm;
