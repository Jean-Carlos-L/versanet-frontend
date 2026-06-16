import { FetchData } from "@/common/hooks/useFetch";
import { Invoice } from "@/common/models/Invoice";

export const getInvoiceByIdService =
  (fetch: FetchData) =>
  async (id: string): Promise<Invoice> => {
    try {
      const response = await fetch<void, Invoice>({
        url: `/api/invoices/${id}`,
        method: "get",
      });

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al obtener la factura"
      );
    }
  };
