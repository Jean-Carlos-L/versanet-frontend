import { useFetch } from "@/common/hooks/useFetch";
import { Invoice } from "@/common/models/Invoice";
import { useEffect, useState } from "react";
import { getInvoicesService } from "../services/getAll.service";
import debounce from "lodash.debounce";

export const useInvoicesQuery = (
  filters?: Record<string, string | boolean | number>
) => {
  const { fetchData } = useFetch();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [pageSize] = useState<number>(25);

  const getInvoices = async () => {
    try {
      setLoading(true);
      // Placeholder for actual service call
      const response = await getInvoicesService(fetchData)({
        limit: pageSize,
        page,
        ...filters,
      });
      setInvoices(response.data);
      setTotal(response.total);
      setTotalPages(response.pages);
    } catch (error) {
      alert(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounced = debounce(getInvoices, 500);
    debounced();

    return () => {
      debounced.cancel();
    };
  }, [refresh, page, filters]);

  return {
    invoices,
    loading,
    page,
    totalPages,
    total,
    pageSize,
    refresh: () => setRefresh((prev) => !prev),
    onPage: (newPage: number) => setPage(newPage),
  };
};
