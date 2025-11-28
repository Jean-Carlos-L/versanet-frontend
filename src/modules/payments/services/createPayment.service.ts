import { FetchData } from "@/common/hooks/useFetch";
import { Payment, PaymentCreate } from "@/common/models/Payment";

interface ResponseData {
    message: string;
    data: Payment;
}

export const createPaymentService = (fetch: FetchData) => async (data: PaymentCreate): Promise<ResponseData> => {
    try {
        const response = await fetch<PaymentCreate, ResponseData>({
            url: "/api/payments",
            method: "post",
            body: data,
        });

        return response.data;
    } catch (error) {
        console.error("Error creating payment:", error);
        throw new Error(error.response?.data?.message || "Unknown error occurred while creating payment");
    }
}