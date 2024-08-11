import axios from "axios";

export const getBiodataList = async (id, searchTerm = '') => {
  try {
    const response = await axios.get(`http://localhost:8080/api/biodata/${id}`, {
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