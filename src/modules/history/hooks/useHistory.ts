import { useState, useEffect } from "react";
import { useFetch } from "@/common/hooks/useFetch";
import { getHistoryByEntityService } from "../services/history.service";
import { FiltersHistory } from "./useFiltersHistory";

export function useHistory(entities: string, filters: FiltersHistory) {
  const { fetchData } = useFetch();
  const [loading, setLoading] = useState(true);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const service = await getHistoryByEntityService(fetchData)(
          entities,
          filters
        );
        setHistorial(service);
      } catch (error) {
        console.error("Error al cargar el historial:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [entities, filters]);

  return { historial, loading };
}
