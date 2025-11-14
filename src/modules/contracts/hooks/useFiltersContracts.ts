import { useEffect, useState } from "react";

export interface FiltersContracts {
  page: number;
  pageSize: number;
  estado: string; // 'activo', 'inactivo' o number si mantienes compatibilidad
  plan?: string; // plan_name o descripcion
  customer?: string; // customer_name o nombres
  customer_document?: string; // cedula para filtro
  date_from?: string; // fecha_inicio
  date_to?: string; // fecha_fin
}

export const useFiltersContracts = () => {
  const [filters, setFilters] = useState<FiltersContracts>({
    page: 1,
    pageSize: 10,
    estado: 'activo', // Default
    plan: "",
    customer: "",
    customer_document: "",
    date_from: "",
    date_to: ""
  });

  const handleChange = (key: keyof FiltersContracts, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: 1 }));
  }, [filters.estado, filters.pageSize]);

  return { filters, handleChange };
};
