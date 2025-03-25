import axios from "axios";


const API_URL = `${import.meta.env.VITE_API_URL}/auth`;


export const registerUser = async (name:string,email: string, password: string, ) => {
  return await axios.post(`${API_URL}/register`, {name, email, password });
};

export const loginUser = async (email: string, password: string) => {
  return await axios.post(`${API_URL}/login`, { email, password });
};

export const getUserDetails = async (token: string) => {
    return await axios.get(`${API_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
