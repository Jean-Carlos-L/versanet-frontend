import { useState, useEffect } from "react";

export const useFilters = () => {
  const [filters, setFilters] = useState<FiltersInvoice>({
    page: 1,
    pageSize: 10,
    status: null,
    plan: "",
    customer: "",
    dateInvoice: "",
  });

  const handleChange = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: 1 }));
  }, [filters.status, filters.pageSize]);

  return { filters, handleChange };
};

export interface FiltersInvoice {
  page: number;
  pageSize: number;
  plan: string;
  customer: string;
  dateInvoice: string;
  status: number;
}
