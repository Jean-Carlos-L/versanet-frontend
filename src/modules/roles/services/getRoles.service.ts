import { FetchData } from "@/common/hooks/useFetch";
import { Role } from "@/common/models/Role";
import { roleAdapter } from "../adapters/role.adapter";

export const getRolesService =
   (fetch: FetchData) =>
      async (filters?: Record<string, string>): Promise<Role[]> => {
         try {
            interface typeResponse { data: Role[], message: string }
            const searchParams = new URLSearchParams(filters).toString();
            const response = await fetch<void, typeResponse>({
               url: `/api/roles?${searchParams}`,
            });

            return response.data.data.map(roleAdapter);
         } catch (error) {
            console.error(error);
            throw new Error(
               error?.response?.data?.message ||
               "Ocurrió un error al obtener los roles"
            );
         }
      };
