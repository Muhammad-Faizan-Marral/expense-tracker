import api from "../lib/api";
import {CreateUserDTO, Login, RegisterResponse } from "../types/auth.type";

export const createUser = async (data: CreateUserDTO):Promise<RegisterResponse> => {
  const response = await api.post("/auth/register", data);
  return response.data; 
};
export const loginUser = async (data: Login):Promise<RegisterResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data; 
};
export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data; 
};
