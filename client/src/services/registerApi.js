import axios from 'axios';

const API_URL = 'http://localhost:8080/api/user';

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(API_URL, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
