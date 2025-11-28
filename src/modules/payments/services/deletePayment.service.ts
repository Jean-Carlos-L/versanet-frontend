import { FetchData } from "@/common/hooks/useFetch";
import { Payment } from "@/common/models/Payment";

interface ResponseData {
  message: string;
  data: Payment;
}

export const deletePaymentService =
  (fetch: FetchData) =>
  async (id: string): Promise<ResponseData> => {
    try {
      const response = await fetch<void, ResponseData>({
        url: `/api/payments/${id}`,
        method: "delete",
      });

      return response.data;
    } catch (error) {
      console.error("Error deleting payment:", error);
      throw error;
    }
  };
