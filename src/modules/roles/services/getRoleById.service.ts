import { FetchData } from "@/common/hooks/useFetch";
import { Role } from "@/common/models/Role";
import { roleAdapter } from "../adapters/role.adapter";

export const getRoleByIdService = (fetch: FetchData) => async (id: string): Promise<Role> => {
   try {
      interface typeResponse { data: Role, message: string }
      const response = await fetch<void, typeResponse>({
         url: `/api/roles/${id}`,
         method: "get"
      })
      return roleAdapter(response.data.data);
   } catch (error) {
      console.error(error);
      throw new Error(
         error?.response?.data?.message ||
         "Ocurrió un error al obtener los roles"
      );
   }
}