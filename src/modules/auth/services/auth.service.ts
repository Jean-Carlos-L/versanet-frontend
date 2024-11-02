import { FetchData } from "@/common/hooks/useFetch";
import { useDispatch } from "react-redux";
import { login, logout } from "@/common/redux/auth.slice";
import { AuthResponse } from "@/common/models/Auth";

export const Auth = (fetch: FetchData) => {
  const dispatch = useDispatch();

  const authenticate = async (email: string, password: string) => {
    try {
      const response = await fetch({
        url: "/api/login",
        method: "post",
        body: { email, password },
      });

      const data = response as unknown as AuthResponse;

      localStorage.setItem("token", data.token);

      dispatch(
        login({
          token: data.token,
          permissions: data.permissions,
        })
      );
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(
        error?.response?.data?.message || "Ocurrió un error al autenticar"
      );
    }
  };

  const logoutUser = async () => {
    try {
      const response = await fetch({
        url: "/api/logout",
        method: "post",
      });

      localStorage.removeItem("token");

      dispatch(logout());
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(
        error?.response?.data?.message || "Ocurrió un error al cerrar sesión"
      );
    }
  };

  return { authenticate, logoutUser };
};
