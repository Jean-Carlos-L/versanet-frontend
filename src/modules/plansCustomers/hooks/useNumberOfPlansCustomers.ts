import { useFetch } from "@/common/hooks/useFetch";
import { useEffect, useState } from "react";
import { FiltersPlansCustomers } from "./useFilters";
import { getNumberOfPlansCustomerService } from "../services/getNumberOfPlansCustomer.service";

export const useNumberOfPlansCustomers = (filters: FiltersPlansCustomers) => {
   const { fetchData } = useFetch();
   const [numberOfPlansCustomers, setNumberOfPlansCustomers] = useState<number>(0);

   const fetchNumberOfPlansCustomers = async () => {
      try {
         const response = await getNumberOfPlansCustomerService(fetchData)(filters);
         setNumberOfPlansCustomers(response);
      } catch (error) {
         console.error("Error al obtener el número de planes de los clientes:", error);
      }
   }

   useEffect(() => {
      fetchNumberOfPlansCustomers();
   }, [filters]);

   return { numberOfPlansCustomers };
}
