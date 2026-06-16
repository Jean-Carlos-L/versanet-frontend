import { Inventory } from "@/common/models/Inventory";
import { useEffect, useState } from "react";
import { getInventoryService } from "../services/getInventory.service";
import { FiltersInventory } from "./useFilters";
import { useFetch } from "@/common/hooks/useFetch";
import debounce from "lodash.debounce";

export const useInventoryQuery = (filters?: FiltersInventory) => {
  const { fetchData } = useFetch();
  const [inventories, setInventory] = useState<Inventory[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const getInventory = async () => {
    try {
      setLoading(true);
      const response = await getInventoryService(fetchData)({
       
        ...filters,
      }, page, pageSize);

      setInventory(response.data);
      setTotal(response.pagination.total);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      alert(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debouncedGetInventory = debounce(getInventory, 500);
    debouncedGetInventory();

    return () => debouncedGetInventory.cancel();
  }, [refresh, page, JSON.stringify(filters)]);

  return {
    inventories,
    loading,
    refresh: () => setRefresh(!refresh),
    onPage: (newPage: number) => setPage(newPage),
    onPageSize: (newPageSize: number) => setPageSize(newPageSize),
    total,
    totalPages,
    page,
    pageSize,
  };
};
