import { FetchData } from "@/common/hooks/useFetch";
import { RoleCreate } from "@/common/models/Role";

export const createRoleService =
   (fetch: FetchData) => async (role: RoleCreate) => {
      try {
         console.log('role', role)
         const response = await fetch({
            url: "/api/v1/roles",
            method: "post",
            body: role,
         });

         return response.data;
      } catch (error) {
         console.error(error);
         throw new Error(
            error?.response?.data?.message || "Ocurrió un error al crear el rol"
         );
      }
   };
