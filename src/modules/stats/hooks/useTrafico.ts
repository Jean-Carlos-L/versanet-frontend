import { useFetch } from "@/common/hooks/useFetch";
import { useState, useEffect } from "react";
import { getTraficoService } from "../services/trafic.service";
import { trafico } from "@/common/models/trafico";

export const useTrafico = () => {
  const { fetchData } = useFetch();
  const [traficoData, setTraficoData] = useState<trafico[]>([]);
  const [loading, setLoading] = useState(true);
  const dataLimit = 6; // Número máximo de datos a mantener

  useEffect(() => {
    // Función para obtener nuevos datos
    const fetchTrafico = async () => {
      try {
        const response = await getTraficoService(fetchData)();
        setTraficoData((prevData) => {
          const updatedData = [...prevData, response];
          if (updatedData.length > dataLimit) {
            updatedData.shift(); // Elimina el primer elemento (el más antiguo)
          }
          return updatedData;
        });
      } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

   

    // Intervalo para obtener nuevos datos cada 3 segundos
    const fetchInterval = setInterval(fetchTrafico, 3000);

    // Limpieza de los intervalos al desmontar el componente
    return () => {
      clearInterval(fetchInterval);
    };
  }, [fetchData]);

  return { traficoData, loading };
};
