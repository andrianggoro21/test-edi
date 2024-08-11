import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_API_BASE_URL;

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
