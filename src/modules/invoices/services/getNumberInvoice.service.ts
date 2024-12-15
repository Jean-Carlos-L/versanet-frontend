import { FetchData } from "@/common/hooks/useFetch";
import { FiltersInvoice } from "../hooks/useFilters";

export const getNumberInvoice =
  (fetch: FetchData) =>
  async (filters: FiltersInvoice): Promise<number> => {
    try {
      const searchParams = new URLSearchParams(
        Object.entries(filters)
      ).toString();
      interface Response {
        data: number;
        message: string;
      }

      const response = await fetch<void, Response>({
        url: `/api/invoices/count?${searchParams}`,
      });
      return response.data.data;
    } catch (error) {
      console.error(
        "Error al obtener el número de historial de facturas:",
        error
      );
      throw new Error(
        error.response?.data?.message ||
          "Ocurrió un error al obtener el número de historial de facturas"
      );
    }
  };
