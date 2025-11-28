import { useFetch } from "@/common/hooks/useFetch";
import { Payment } from "@/common/models/Payment";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { listPaymentByInvoiceService } from "../services/listPaymentByInvoice.service";

export const usePaymentsByInvoiceQuery = (invoiceId: string) => {
  const { fetchData } = useFetch();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await listPaymentByInvoiceService(fetchData)(invoiceId);
      setPayments(response.data);
    } catch (error) {
      setError("Error fetching payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debouncedFetch = debounce(fetchPayments, 500);
    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [invoiceId, refresh]);

  return {
    payments,
    loading,
    error,
    refresh: () => setRefresh((prev) => !prev),
  };
};
