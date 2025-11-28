import { FetchData } from "@/common/hooks/useFetch";
import { FiltersContracts } from "../hooks/useFiltersContracts";
export const getNumberOfContractsService = (fetch: FetchData) => async (filters: FiltersContracts): Promise<number> => {
   try {
      const searchParams = new URLSearchParams(Object.entries(filters)).toString();
      const response = await fetch<void, any>({ url: `/api/contracts/count?${searchParams}` });
      const raw: any = response?.data;
      return raw?.data ?? raw ?? 0;
   } catch (error) {
      console.error("Error al obtener el número de contratos:", error);
      throw new Error(
         error.response?.data?.message ||
         "Ocurrió un error al obtener el número de contratos"
      );
   }
}
