import { FetchData } from "@/common/hooks/useFetch";
import { Role } from "@/common/models/Role";
import { roleAdapter } from "../adapters/role.adapter";

export const getRoleByIdService = (fetch: FetchData) => async (id: string): Promise<Role> => {
   try {
      /* const response = await fetch<void, Role>({
         url: `/api/v1/roles/${id}`,
         method: "get"
      })

      return roleAdapter(response.data); */

      return {
         id: "1",
         description: "Administrador del sistema",
         status: 1,
         permissions: [
            {
               id: "1",
               description: "Crear registros"
            },
            {
               id: "2",
               description: "Leer registros"
            },
            {
               id: "3",
               description: "Actualizar registros"
            },
            {
               id: "4",
               description: "Eliminar registros"
            }
         ]
      }
   } catch (error) {
      console.error(error);
      throw new Error(
         error?.response?.data?.message ||
         "Ocurrió un error al obtener los roles"
      );
   }
}