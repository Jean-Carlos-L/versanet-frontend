import { FetchData } from "@/common/hooks/useFetch";

export const enablePlanCustomerService =
   (fetch: FetchData) => async (id: string) => {
      try {
         interface Response {
            message: string;
         }
         const response = await fetch<void, Response>({
            url: `/api/plans-customers/enable/${id}`,
            method: "put",
         });
         return response.data.message;
      } catch (error) {
         console.error("Error al habilitar el plan del cliente:", error);
         throw new Error(
            error.response?.data?.message ||
            "Ocurrió un error al habilitar el plan del cliente"
         );
      }
   };
