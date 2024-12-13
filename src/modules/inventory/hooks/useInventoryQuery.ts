import { Inventory } from "@/common/models/Inventory";
import { useEffect, useState } from "react";
import { getInventoryService } from "../services/getInventory.service";
import { FiltersInventory } from "./useFilters";
import { useFetch } from "@/common/hooks/useFetch";
import debounce from "lodash.debounce";


export const useInventoryQuery = (filters?: FiltersInventory) => {
   const { fetchData } = useFetch();
   const [inventories, setInventory] = useState<Inventory[]>([]);
   const [loading, setLoading] = useState(false);
   const [refresh, setRefresh] = useState(false);

   const getInventory = async () => {
      try {
         setLoading(true);
         const response = await getInventoryService(fetchData)(filters);
         setInventory(response);
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
   }, [refresh, filters]);

   return {
      inventories,
      loading,
      refresh: () => setRefresh(!refresh),
   };
}