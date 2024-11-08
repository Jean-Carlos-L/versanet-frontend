import { FetchData } from "@/common/hooks/useFetch";

export const logoutService = (fetch: FetchData) => async () => {
   try {
      await fetch({
         url: "/api/logout",
         method: "post",
      });
   } catch (error) {
      console.error(error);
      throw new Error(
         error?.response?.data?.message || "Ocurrió un error al cerrar sesión"
      );
   }
}