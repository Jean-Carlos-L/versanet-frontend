import { useFetch } from "@/common/hooks/useFetch";
import { useEffect, useState } from "react";
import { getNumberHistory } from "../services/getNumberHistory.service";

export function useNumberHistory(entities: string) {
  const { fetchData } = useFetch();
  const [loading, setLoading] = useState(true);
  const [numberHistory, setNumberHistory] = useState<number>(0);

  useEffect(() => {
    const fetchNumberHistory = async () => {
      setLoading(true);
      try {
        const service = await getNumberHistory(fetchData)(entities);
        setNumberHistory(service);
      } catch (error) {
        console.error("Error al cargar el número de historial:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNumberHistory();
  }, [entities]);

  return { numberHistory, loading };
}
