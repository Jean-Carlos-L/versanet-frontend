import { Contract } from "@/common/models/Contract";
import { useEffect, useState } from "react";
import { getContractsService } from "../services/getContracts.service";
import { FiltersContracts } from "./useFiltersContracts";
import { useFetch } from "@/common/hooks/useFetch";
import debounce from "lodash.debounce";
import { contractAdapter } from "../adapters/contract.adapter";

export const useContractsQuery = (filters?: FiltersContracts) => {
  const { fetchData } = useFetch();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const getContracts = async () => {
    try {
      setLoading(true);
      const { data, total: totalCount, totalPages: pages } = await getContractsService(fetchData)(filters);
      setContracts(data.map(contractAdapter)); // Asumiendo adapter maneja array
      setTotal(totalCount);
      setTotalPages(pages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debouncedGet = debounce(getContracts, 500);
    debouncedGet();
    return () => debouncedGet.cancel();
  }, [refresh, filters?.page, filters?.pageSize, filters?.estado, filters?.plan, filters?.customer]);

  return {
    contracts,
    loading,
    total,
    totalPages,
    refresh: () => setRefresh(!refresh),
  };
};
