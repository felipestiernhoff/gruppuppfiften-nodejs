import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const fetchBlockchain = async () => {
  return axios.get(`${API_URL}/blockchain`);
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
