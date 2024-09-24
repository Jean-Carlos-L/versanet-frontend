import { FetchData } from "@/common/hooks/useFetch";
import { User } from "@/common/models/User";
import { UserAdapter } from "../adapters/user.adapter";

export const getUsersService =
  (fetch: FetchData) =>
  async (filters?: Record<string, string>): Promise<User[]> => {
    try {
      //   interface typeResponse {
      //     data: User[];
      //     message: string;
      //   }
      //   const searchParams = new URLSearchParams(filters).toString();
      //   const response = await fetch<void, typeResponse>({
      //     url: `/api/v1/users?${searchParams}`,
      //   });

      //   return response.data.data.map(UserAdapter);

      return [
        {
          id: "1",
          name: "John Doe",
          email: "jhon@gamil.co",
          password: "",
          status: 1,
          roles: {
            description: "Admin",
          },
        },
        {
          id: "2",
          name: "Jane Doe",
          email: "jane@example.com-",
          password: "",
          status: 1,
          roles: {
            description: "User",
          },
        },
      ];
    } catch (error) {
      console.error(error);
      throw new Error(
        error?.response?.data?.message ||
          "Ocurrió un error al obtener los usuarios"
      );
    }
  };
