import { useFetch } from "@/common/hooks/useFetch";
import { useEffect, useState } from "react";
import { FiltersContracts } from "./useFiltersContracts";
import { getContractsService } from "../services/getContracts.service"; 

export const useNumberOfContracts = (filters: FiltersContracts) => {
  const { fetchData } = useFetch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const { total: count } = await getContractsService(fetchData)(filters);
        setTotal(count);
      } catch (error) {
        console.error("Error al obtener total de contratos:", error);
      }
    };
    fetchTotal();
  }, [filters]);

  return { total };
};
