import { FetchData } from "@/common/hooks/useFetch";
import { History } from "@/common/models/History";
import { FiltersHistory } from "../hooks/useFiltersHistory";

export const getHistoryByEntityService =
  (fetch: FetchData) =>
  async (entity: string, filters: FiltersHistory): Promise<History[]> => {
    try {
      const searchParams = new URLSearchParams(
        Object.entries(filters)
      ).toString();
      interface Response {
        data: History[];
        message: string;
      }
      const response = await fetch<void, Response>({
        url: `/api/history/${entity}?${searchParams}`,
        method: "get",
      });
      return response.data.data;
    } catch (error) {
      console.error("Error al obtener el historial de las entidades:", error);
      throw new Error(
        error.response?.data?.message ||
          "Ocurrió un error al obtener el historial de las entidades"
      );
    }
  };
