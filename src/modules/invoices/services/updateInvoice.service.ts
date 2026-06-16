import { FetchData } from "@/common/hooks/useFetch";
import { Invoice, InvoiceUpdate } from "@/common/models/Invoice";

interface ResponseData {
  message: string;
  data: Invoice;
}

export const updateInvoiceService =
  (fetch: FetchData) =>
  async (id: string, data: InvoiceUpdate): Promise<ResponseData> => {
    try {
      interface ResponseApi {
        message: string;
        data: Invoice;
      }
      const response = await fetch<InvoiceUpdate, ResponseApi>({
        url: `/api/invoices/${id}`,
        method: "put",
        body: data,
      });

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al actualizar la factura"
      );
    }
  };
