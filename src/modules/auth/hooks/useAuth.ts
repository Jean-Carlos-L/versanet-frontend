import { useState } from "react";
import { useFetch } from "@/common/hooks/useFetch";
import { Auth } from "../services/auth.service";

export const useAuth = () => {
  const { fetchData } = useFetch();
  const { authenticate, logoutUser } = Auth(fetchData);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await authenticate(email, password);
      return response;
    } catch (error) {
      if (error.response?.status === 401) {
        setErrors({ message: "Credenciales incorrectas" });
      } else {
        setErrors({ message: error.message || "Ocurrió un error inesperado" });
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await logoutUser();
    } catch (error) {
      setErrors({ message: error.message || "Ocurrió un error inesperado" });
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, errors, logout };
};
