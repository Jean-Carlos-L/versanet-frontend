import { FetchData } from "@/common/hooks/useFetch";
import { PaymentCreate } from "@/common/models/Payment";

export const createPayment =
  (fetch: FetchData) => async (contract: PaymentCreate) => {
    try {
      console.log(contract);
      const response = await fetch({
        url: `/api/payments`,
        method: "post",
        body: contract,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error?.response?.data?.message || "Ocurrió un error al crear el pago"
      );
    }
  };
