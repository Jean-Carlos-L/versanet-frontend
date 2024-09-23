import { FetchData } from "@/common/hooks/useFetch";
import { RoleUpdate } from "@/common/models/Role";

export const updateRoleService =
   (fetch: FetchData) => async (role: RoleUpdate) => {
      try {
         const response = await fetch({
            url: `/api/roles/${role.id}`,
            method: "put",
            body: role,
         });

         return response.data;
      } catch (error) {
         console.error(error);
         throw new Error(
            error?.response?.data?.message ||
            "Ocurrió un error al actualizar el rol"
         );
      }
   };
