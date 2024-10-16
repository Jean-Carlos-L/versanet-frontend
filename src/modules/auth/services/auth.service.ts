import { FetchData } from "@/common/hooks/useFetch";

export const Auth =
  (fetch: FetchData) => async (email: string, password: string) => {
    try {
      const response = await fetch({
        url: "/api/login",
        method: "post",
        body: { email, password },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(
        error?.response?.data?.message || "Ocurrió un error al autenticar"
      );
    }
  };

export const Authlogout = (fetch: FetchData) => async () => {
  try {
    const response = await fetch({
      url: "/api/logout",
      method: "post",
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error?.response?.data?.message || "Ocurrió un error al cerrar sesión"
    );
  }
};
