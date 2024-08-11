import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_API_BASE_URL;

export const getBiodataList = async (id, searchTerm = '') => {
  try {
    const response = await axios.get(`${API_URL}/biodata/${id}`, {
      params: {
        searchTerm,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching biodata:", error);
    throw error; 
  }
};