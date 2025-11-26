import { FetchData } from "@/common/hooks/useFetch";
import { InvoiceCreate } from "@/common/models/Invoice";

interface ResponseData {
  message: string;
}

export const createInvoiceService =
  (fetch: FetchData) =>
  async (data: InvoiceCreate): Promise<ResponseData> => {
    try {
      interface ResponseApi {
        message: string;
      }
      const response = await fetch<InvoiceCreate, ResponseApi>({
        url: "/api/invoices",
        method: "post",
        body: data,
      });

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al crear la factura"
      );
    }
  };
