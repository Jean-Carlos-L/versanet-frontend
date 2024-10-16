import { useState } from "react";

export const useFilters = () => {
   const [filters, setFilters] = useState<FiltersPlansCustomers>({
      page: 1,
      pageSize: 10,
      status: 1,
   });

   const handleChange = (key: string, value: string | number) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
   }

   return { filters, handleChange }
}

export interface FiltersPlansCustomers {
   page: number
   pageSize: number;
   status: number;
}