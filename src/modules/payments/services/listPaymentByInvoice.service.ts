import { FetchData } from "@/common/hooks/useFetch";
import { Payment } from "@/common/models/Payment";

interface ResponseData {
  data: Payment[];
}

export const listPaymentByInvoiceService =
  (fetch: FetchData) =>
  async (invoiceId: string): Promise<ResponseData> => {
    try {
      const response = await fetch<void, ResponseData>({
        url: "/api/payments/invoice/" + invoiceId,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching payments by invoice:", error);
      throw error;
    }
  };
