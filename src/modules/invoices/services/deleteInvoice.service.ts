import { FetchData } from "@/common/hooks/useFetch";

interface ResponseData {
  message: string;
}

export const deleteInvoiceService =
  (fetch: FetchData) =>
  async (id: string): Promise<ResponseData> => {
    try {
      interface ResponseApi {
        message: string;
      }
      const response = await fetch<void, ResponseApi>({
        url: `/api/invoices/${id}`,
        method: "delete",
      });

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al eliminar la factura"
      );
    }
  };
