import { FetchData } from "@/common/hooks/useFetch";
import { Invoice } from "@/common/models/Invoice";

interface Response {
  data: Invoice[];
  currentPage: number;
  total: number;
  pages: number;
}

export const getInvoicesService =
  (fetch: FetchData) =>
  async (
    filters: Record<string, string | boolean | number>
  ): Promise<Response> => {
    try {
      const searchParams = new URLSearchParams(
        filters as Record<string, string>
      ).toString();

      interface ResponseFetch {
        data: Invoice[];
        metadata: {
          currentPage: number;
          total: number;
          pages: number;
        };
      }

      const response = await fetch<void, ResponseFetch>({
        url: `/api/invoices?${searchParams}`,
      });

      return {
        data: response.data.data,
        currentPage: response.data.metadata.currentPage,
        total: response.data.metadata.total,
        pages: response.data.metadata.pages,
      };
    } catch (error) {
      console.error("Error al obtener las facturas:", error);
      throw new Error(
        error.response?.data?.message ||
          "Ocurrió un error al obtener las facturas"
      );
    }
  };
