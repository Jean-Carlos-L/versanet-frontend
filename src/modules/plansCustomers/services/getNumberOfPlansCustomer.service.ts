import { FetchData } from "@/common/hooks/useFetch";
import { FiltersPlansCustomers } from "../hooks/useFilters";

export const getNumberOfPlansCustomerService = (fetch: FetchData) => async (filters: FiltersPlansCustomers): Promise<number> => {
   try {
      const searchParams = new URLSearchParams(Object.entries(filters)).toString();
      interface Response {
         data: number;
         message: string;
      }

      const response = await fetch<void, Response>({ url: `/api/plans-customers/count?${searchParams}` });
      return response.data.data;
   } catch (error) {
      console.error("Error al obtener el número de planes de los clientes:", error);
      throw new Error(
         error.response?.data?.message ||
         "Ocurrió un error al obtener el número de planes de los clientes"
      );
   }
}