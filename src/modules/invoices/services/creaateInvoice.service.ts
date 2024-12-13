import { FetchData } from "@/common/hooks/useFetch";

export const createInvoice =
  (fetch: FetchData) => async (idContrato: string) => {
    try {
      const response = await fetch({
        url: `/api/invoices/${idContrato}`,
        method: "post",
        body: {},
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error?.response?.data?.message || "Ocurrió un error al crear la factura"
      );
    }
  };
