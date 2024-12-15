import { useEffect, useState } from "react";
import { useFetch } from "@/common/hooks/useFetch";
import { FiltersInvoice } from "./useFilters";
import { getNumberInvoice } from "../services/getNumberInvoice.service";

export const useNumberInvoice = (filters: FiltersInvoice) => {
  const { fetchData } = useFetch();
  const [numberInvoice, setNumberInvoice] = useState<number>(0);

  const fetchNumberInvoice = async () => {
    try {
      const response = await getNumberInvoice(fetchData)(filters);
      setNumberInvoice(response);
    } catch (error) {
      console.error("Error al obtener el número de facturas:", error);
    }
  };

  useEffect(() => {
    fetchNumberInvoice();
  }, [filters]);

  return { numberInvoice };
};
