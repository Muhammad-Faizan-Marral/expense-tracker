import { useState } from "react";
import { CreateUserDTO, Login, RegisterResponse } from "../types/auth.type";
import { createUser, loginUser } from "../services/user.service";

export const useRegister = () => {
  const [user, setUser] = useState<RegisterResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const register = async (data: CreateUserDTO) => {
    try {
      setLoading(true);
      const response = await createUser(data);
      setUser(response);
      return response
    } finally {
      setLoading(false);
    }
  };
  return{
    user,
    loading,
    register
  }};


export const useLogin = () => {
  const [user, setUser] = useState<RegisterResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (data: Login) => {
    try {
      setLoading(true);
      const response = await loginUser(data);
      setUser(response);
      return response
    } finally {
      setLoading(false);
    }
  };
  return{
    user,
    loading,
    login
  }};


