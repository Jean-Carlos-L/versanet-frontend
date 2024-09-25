import { FetchData } from "@/common/hooks/useFetch";
import { User } from "@/common/models/User";
import { userAdapter } from "../adapters/user.adapter";

export const getUsersService =
  (fetch: FetchData) =>
    async (filters?: Record<string, string>): Promise<User[]> => {
      try {
        interface typeResponse { data: User[], message: string }
        const searchParams = new URLSearchParams(filters).toString();
        const response = await fetch<void, typeResponse>({
          url: `/api/users?${searchParams}`,
        });
        // Mapear los usuarios solo si existen
        return response.data.data.map(userAdapter);

      } catch (error) {
        console.error("Error al obtener los usuarios:", error);

        throw new Error(
          error?.response?.data?.message ||
          "Ocurrió un error al obtener los usuarios"
        );
      }
    };
