import { FetchData } from "@/common/hooks/useFetch";

export const disablePlanCustomerService = (fetch: FetchData) => async (id: string) => {
   try {
      interface Response {
         message: string;
      }

      const response = await fetch<void, Response>({
         url: `/api/plans-customers/disable/${id}`,
         method: "put",
      });

      return response.data.message;
   } catch (error) {
      console.error("Error al deshabilitar el plan del cliente:", error);
      throw new Error(
         error.response?.data?.message ||
         "Ocurrió un error al deshabilitar el plan del cliente"
      );
   }
}