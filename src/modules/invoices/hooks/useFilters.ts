import { useState, useEffect } from "react";

export const useFilters = () => {
  const [filters, setFilters] = useState<filtersInvoice>({
    page: 1,
    pageSize: 10,
    status: 1,
    plan: "",
    customer: "",
    startDate: "",
  });

  const handleChange = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: 1 }));
  }, [filters.status, filters.pageSize]);

  return { filters, handleChange };
};

export interface filtersInvoice {
  page: number;
  pageSize: number;
  status: number;
  plan: string;
  customer: string;
  startDate: string;
}
