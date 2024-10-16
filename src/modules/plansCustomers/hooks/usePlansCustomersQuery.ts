import { PlanCustomer } from "@/common/models/PlanCustomer";
import { useEffect, useState } from "react";
import { getPlansCustomersService } from "../services/getPlansCustomers.service";
import { FiltersPlansCustomers } from "./useFilters";
import { useFetch } from "@/common/hooks/useFetch";
import debounce from "lodash.debounce";

export const usePlansCustomersQuery = (filters?: FiltersPlansCustomers) => {
   const { fetchData } = useFetch();
   const [plansCustomers, setPlansCustomers] = useState<PlanCustomer[]>([]);
   const [loading, setLoading] = useState(false);
   const [refresh, setRefresh] = useState(false);

   const getPlansCustomers = async () => {
      try {
         setLoading(true);
         const response = await getPlansCustomersService(fetchData)(filters);
         setPlansCustomers(response);
      } catch (error) {
         alert(error.message);
         console.error(error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      const debouncedGetPlansCustomers = debounce(getPlansCustomers, 500);
      debouncedGetPlansCustomers();

      return () => debouncedGetPlansCustomers.cancel();
   }, [refresh, filters]);

   return {
      plansCustomers,
      loading,
      refresh: () => setRefresh(!refresh),
   };
}