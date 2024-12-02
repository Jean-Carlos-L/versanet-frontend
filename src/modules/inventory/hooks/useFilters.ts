import { useEffect, useState } from "react";

//este filtro será para la tabla de inventario, se podrá filtrar por referencia, mac, ip, status y tipo de inventario
export const useFilters = () => {
   const [filters, setFilters] = useState<FiltersInventory>({
      page: 1,
      pageSize: 10,
      reference: "",
      mac: "",
      ip: "",
      status: 1,
      typeInventory: ""
   });

   const handleChange = (key: string, value: string | number) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
   }

   useEffect(() => {
      setFilters((prev) => ({ ...prev, page: 1 }));
   }, [filters.status, filters.pageSize]);

   return { filters, handleChange }
}

export interface FiltersInventory {
   page: number
   pageSize: number;
   reference: string;
   mac: string;
   ip: string;
   status: number;
   typeInventory: string;
}