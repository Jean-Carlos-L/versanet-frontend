import { useState, useMemo } from "react";
import { User } from "@/common/models/User";

export function useUsersFilters(users: User[]) {
  const [search, setSearch] = useState(""); // Un solo estado para la búsqueda

  // Manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Lógica de filtrado y ordenamiento
  const filteredUsers = useMemo(() => {
    // Convertir la búsqueda a minúsculas para que sea case-insensitive
    const searchLower = search.toLowerCase();

    // Filtrar por nombre, correo o rol
    const filtered = users.filter((user) => {
      const nameMatch = user.name.toLowerCase().includes(searchLower);
      const emailMatch = user.email.toLowerCase().includes(searchLower);
      const roleMatch = user.roles?.description
        .toLowerCase()
        .includes(searchLower);
      return nameMatch || emailMatch || roleMatch;
    });

    // Ordenar alfabéticamente por el nombre
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [search, users]); // Se ejecuta cuando cambian la búsqueda o los usuarios

  return {
    search,
    filteredUsers,
    handleSearchChange,
  };
}
