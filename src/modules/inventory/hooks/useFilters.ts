import {  useState } from "react";

//este filtro será para la tabla de inventario, se podrá filtrar por referencia, mac, ip, status y tipo de inventario
export const useFilters = () => {
  const [filters, setFilters] = useState<FiltersInventory>({
    referencia: "",
    mac: "",
    direccion_red: "",
    tipo_equipo: "",
    estado: "",
  });

  const handleChange = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };


  return { filters, handleChange };
};

export interface FiltersInventory {
  referencia: string;
  mac: string;
  direccion_red: string;
  tipo_equipo: string;
  cantidad?: number;
  estado: string; // "activo" | "inactivo"
}
