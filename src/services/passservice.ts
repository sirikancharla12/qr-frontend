import axios, { AxiosResponse } from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/pass`;

export const generatePass = async (userId: number, passDetails: string) => {
  return await axios.post(`${API_URL}/generate`, { userId, passDetails });
};

interface Pass {
    id: number;
    passDetails: string;
    qrCode: string;
    location:string,
    date:string
  
  }

  export const getUserPasses = async (userId: number): Promise<AxiosResponse<Pass[]>> => {
return await axios.get(`${API_URL}/user/${userId}`);

  };


