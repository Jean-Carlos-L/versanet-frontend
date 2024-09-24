import { FetchData } from "@/common/hooks/useFetch";
import { UserCreate } from "@/common/models/User";

export const createUserService =
  (fetch: FetchData) => async (user: UserCreate) => {
    try {
      const response = await fetch({
        url: "/api/v1/users",
        method: "post",
        body: user,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(
        error?.response?.data?.message || "Ocurrió un error al crear el usuario"
      );
    }
  };
