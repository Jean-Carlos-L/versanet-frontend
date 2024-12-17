import { useState } from "react";
import { useFetch } from "@/common/hooks/useFetch";
import { PaymentCreate } from "@/common/models/Payment";
import { createPayment } from "../services/payment.service";

export const usePaymentsCommand = (refresh?: () => void) => {
  const { fetchData } = useFetch();
  const [loadingAction, setLoadingAction] = useState(false);

  const createPayments = async (payment: PaymentCreate) => {
    try {
      console.log(payment);
      setLoadingAction(true);
      const response = await createPayment(fetchData)(payment);
      if (refresh) {
        refresh();
      }
      alert("Pago creado correctamente");
      return response;
    } catch (error) {
      alert(error.message);
    } finally {
      setLoadingAction(false);
    }
  };

  return {
    createPayments,
    loadingAction,
  };
};
