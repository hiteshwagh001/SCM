import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const testConnection = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hello`);
    return response.data;
  } catch (error) {
    console.error("Error testing connection:", error);
    throw error;
  }
};
