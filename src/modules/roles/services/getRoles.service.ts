import { FetchData } from "@/common/hooks/useFetch";
import { Role } from "@/common/models/Role";
import { roleAdapter } from "../adapters/role.adapter";

export const getRolesService =
   (fetch: FetchData) =>
      async (filters?: Record<string, string>): Promise<Role[]> => {
         try {
            return [
               {
                  id: "1",
                  description: "Admin",
                  status: "active",
                  permissions: [],
                  createdAt: new Date(),
                  updatedAt: new Date()
               },
               {
                  id: "2",
                  description: "User",
                  status: "active",
                  permissions: [],
                  createdAt: new Date(),
                  updatedAt: new Date()
               }
            ]
            /* const searchParams = new URLSearchParams(filters).toString();
            const response = await fetch<void, Role[]>({
               url: `/api/v1/roles?${searchParams}`,
            });

            return response.data.map(roleAdapter); */

            // TODO: Implementar lógica para obtener los roles
         } catch (error) {
            console.error(error);
            throw new Error(
               error?.response?.data?.message ||
               "Ocurrió un error al obtener los roles"
            );
         }
      };
