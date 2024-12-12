import { useFetch } from "@/common/hooks/useFetch";
import { useEffect, useState } from "react";
import { FiltersInventory } from "./useFilters";
import { getNumberOfInventoryService } from "../services/getNumberOfInventory.service";

export const useNumberOfInventory = (filters: FiltersInventory) => {
   const { fetchData } = useFetch();
   const [numberOfInventory, setNumberOfInventory] = useState<number>(0);

   const fetchNumberOfInventory = async () => {
      try {
         const response = await getNumberOfInventoryService(fetchData)(filters);
         setNumberOfInventory(response);
      } catch (error) {
         console.error("Error al obtener el número de inventario:", error);
      }
   }

   useEffect(() => {
      fetchNumberOfInventory();
   }, [filters]);

   return { numberOfInventory };
}