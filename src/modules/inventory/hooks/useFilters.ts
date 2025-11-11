import { useEffect, useState } from "react";

//este filtro será para la tabla de inventario, se podrá filtrar por referencia, mac, ip, status y tipo de inventario
export const useFilters = () => {
   const [filters, setFilters] = useState<FiltersInventory>({
      page: 1,
      pageSize: 10,
      referencia: "",
      mac: "",
      direccion_red: "",
      tipo_equipo: "",
      estado: "activo",
   });

   const handleChange = (key: string, value: string | number) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
   }

   useEffect(() => {
      setFilters((prev) => ({ ...prev, page: 1 }));
   }, [filters.estado, filters.pageSize]);

   return { filters, handleChange }
}

export interface FiltersInventory {
    page: number;
    pageSize: number;
    referencia: string;
    mac: string;
    direccion_red: string;
    tipo_equipo: string;
    cantidad?: number;
    estado: string;  // "activo" | "inactivo"
}