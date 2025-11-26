import { useEffect, useState } from "react";
import { Plan } from "@/common/models/Plan";
import { useFetch } from "@/common/hooks/useFetch";
import { getPlansService } from "../services/getPlans.service";
import debounce from "lodash.debounce";

export const usePlansQuery = (filters?: Record<string, any>) => {
  const { fetchData } = useFetch();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [pageSize] = useState(25);

  const getPlans = async () => {
    try {
      setLoading(true);
      const response = await getPlansService(fetchData)({
        limit: pageSize,
        page,
        ...filters,
      });
      setPlans(response.data);
      setPage(response.currentPage);
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
    const debouncedGetPlans = debounce(getPlans, 500);
    debouncedGetPlans();

    return () => {
      debouncedGetPlans.cancel();
    };
  }, [refresh, page, filters]);

  return {
    plans,
    page,
    total,
    totalPages,
    pageSize,
    onPage: (newPage: number) => setPage(newPage),
    refresh: () => setRefresh((prev) => !prev),
    loading,
  };
};
