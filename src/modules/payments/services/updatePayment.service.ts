import { FetchData } from "@/common/hooks/useFetch";
import { Payment, PaymentUpdate } from "@/common/models/Payment";

interface ResponseData {
  message: string;
  data: Payment;
}

export const updatePaymentService =
  (fetch: FetchData) =>
  async (id: string, data: PaymentUpdate): Promise<ResponseData> => {
    try {
      const response = await fetch<PaymentUpdate, ResponseData>({
        url: `/api/payments/${id}`,
        method: "put",
        body: data,
      });

      return response.data;
    } catch (error) {
      console.error("Error updating payment:", error);
      throw new Error(error.response?.data?.message || "Unknown error occurred while updating payment");
    }
  };
