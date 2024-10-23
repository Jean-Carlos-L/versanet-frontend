import { useEffect, useState } from "react";

export const useFilters = () => {
   const [filters, setFilters] = useState<FiltersPlansCustomers>({
      page: 1,
      pageSize: 10,
      status: 1,
      plan: "",
      customer: "",
      startDate: "",
      endDate: ""
   });

   const handleChange = (key: string, value: string | number) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
   }

   useEffect(() => {
      setFilters((prev) => ({ ...prev, page: 1 }));
   }, [filters.status, filters.pageSize]);

   return { filters, handleChange }
}

export interface FiltersPlansCustomers {
   page: number
   pageSize: number;
   status: number;
   plan: string;
   customer: string;
   startDate: string;
   endDate: string;
}