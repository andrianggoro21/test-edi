import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {
    id: null,
    email: "",
    role_id: null,
  },
  isLogin: false,
};

export const AuthReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, email, role_id } = action.payload;
      state.user = { id, email, role_id };
    },
    loginSuccess: (state) => {
      state.isLogin = true;
    },
    logoutSuccess: (state) => {
      state.isLogin = false;
      localStorage.removeItem("token");
    },
    keepLoginSuccess: (state) => {
      state.isLogin = true;
    },
  },
});

const API_URL = import.meta.env.VITE_REACT_API_BASE_URL;

export const login = (email, password, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/login`,
        {
          email,
          password,
        }
      );
      console.log("response", response.data.data);
      localStorage.setItem("token", response?.data?.data?.token);
      dispatch(setUser(response?.data?.data.user));
      dispatch(loginSuccess());
      alert("Login Success");
      navigate(`/dashboard/${response?.data?.data?.user?.id}`);
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
      throw error;
    }
  };
};



export const keepLogin = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(
          `${API_URL}/user/keeplogin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(setUser(response?.data?.data));
        dispatch(keepLoginSuccess());
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const { setUser, loginSuccess, logoutSuccess, keepLoginSuccess } =
  AuthReducer.actions;

export default AuthReducer.reducer;
