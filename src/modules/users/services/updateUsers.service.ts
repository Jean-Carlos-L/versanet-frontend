import { FetchData } from "@/common/hooks/useFetch";
import { UserUpdate } from "@/common/models/User";

export const updateUserService =
  (fetch: FetchData) => async (user: UserUpdate) => {
    try {
      const response = await fetch({
        url: `/api/v1/users/${user.id}`,
        method: "put",
        body: user,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(
        error?.response?.data?.message ||
          "Ocurrió un error al actualizar el usuario"
      );
    }
  };
