import { useEffect, useState } from "react";

export interface FiltersHistory {
  entity: string;
  page: number;
  pageSize: number;
  startDate: string;
}
export function useFiltersHistory() {
  const [filters, setFilters] = useState<FiltersHistory>({
    page: 1,
    pageSize: 10,
    entity: "",
    startDate: "",
  });

  const handleChange = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: 1 }));
  }, [filters.pageSize]);

  return { filters, handleChange };
}
