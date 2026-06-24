import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export const useRegister = () => {
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);

  const register = async (data: { name: string; email: string; password: string }) => {
    try {
      setLoading(true);
      await signup(data.name, data.email, data.password);
    } finally {
      setLoading(false);
    }
  };

  return { loading, register };
};

export const useLogin = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const loginUser = async (email: string, password: string) => {
    try {
      setLoading(true);
      await login(email, password);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login: loginUser };
};