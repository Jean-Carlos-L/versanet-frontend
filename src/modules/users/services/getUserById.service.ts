import { FetchData } from "@/common/hooks/useFetch";
import { User } from "@/common/models/User";
import { userAdapter } from "../adapters/user.adapter";

export const getUserById =
  (fetch: FetchData) =>
    async (id: string): Promise<User> => {
      try {
        interface typeResponse {
          data: User;
          message: string;
        }
        const response = await fetch<void, typeResponse>({
          url: `/api/users/${id}`,
          method: "get",
        });

        return userAdapter(response.data.data);
      } catch (error) {
        console.error(error);
        throw new Error(
          error?.response?.data?.message ||
          "Ocurrió un error al obtener los usuarios"
        );
      }
    };
