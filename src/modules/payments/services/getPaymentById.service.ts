import { FetchData } from "@/common/hooks/useFetch";
import { Payment } from "@/common/models/Payment";

interface ResponseData {
  message: string;
  data: Payment;
}

export const getPaymentByIdService =
  (fetch: FetchData) =>
  async (id: string): Promise<ResponseData> => {
    try {
      const response = await fetch<void, ResponseData>({
        url: `/api/payments/${id}`,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching payment by ID:", error);
      throw error;
    }
  };
