import { useEffect, useState } from "react";
import { useFetch } from "@/common/hooks/useFetch";
import { getInvoiceAllService } from "../services/getInvoiceAll.service";
import { FiltersInvoice } from "./useFilters";
import { Invoice } from "@/common/models/Invoice";
import debounce from "lodash.debounce";

export const useInvoiceQuery = (filters: FiltersInvoice) => {
  const { fetchData } = useFetch();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const getInvoiceAll = async () => {
    try {
      setLoading(true);
      const response = await getInvoiceAllService(fetchData)(filters);
      setInvoices(response);
    } catch (error) {
      alert(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debouncedGetInvoiceAll = debounce(getInvoiceAll, 500);
    debouncedGetInvoiceAll();

    return () => debouncedGetInvoiceAll.cancel();
  }, [refresh, filters]);

  return {
    invoices,
    loading,
    refresh: () => setRefresh(!refresh),
  };
};
