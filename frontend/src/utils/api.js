import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const fetchBlockchain = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/blockchain");
    return response.data; // Ensure that you are returning data correctly
  } catch (error) {
    console.error("Error fetching blockchain: ", error);
    throw error; // Re-throwing error to be caught in the viewer component
  }
};

export const createTransaction = async (data) => {
  return axios.post(`${API_URL}/transactions/new`, data);
};

export const mineBlock = async () => {
  return axios.post(`${API_URL}/mine`);
};

export const runConsensus = async () => {
  return axios.post(`${API_URL}/consensus`, {
    nodes: ["localhost:3000", "localhost:3001"],
  });
};
