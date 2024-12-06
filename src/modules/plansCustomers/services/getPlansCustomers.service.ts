import { FetchData } from "@/common/hooks/useFetch";
import { FiltersPlansCustomers } from "../hooks/useFilters";
import { PlanCustomer } from "@/common/models/PlanCustomer";
import { planCustomerAdapter } from "../adapters/planCustomer.adapter";

export const getPlansCustomersService = (fetch: FetchData) => async (filters: FiltersPlansCustomers): Promise<PlanCustomer[]> => {
   try {
      const searchParams = new URLSearchParams(Object.entries(filters)).toString();
      interface Response {
         data: PlanCustomer[];
         message: string;
      }

      const response = await fetch<void, Response>({ url: `/api/plans-customers?${searchParams}` });
      return response.data.data.map(planCustomerAdapter)
   } catch (error) {
      console.error("Error al obtener los planes de los clientes:", error);
      throw new Error(
         error.response?.data?.message ||
         "Ocurrió un error al obtener los planes de los clientes"
      );
   }
}