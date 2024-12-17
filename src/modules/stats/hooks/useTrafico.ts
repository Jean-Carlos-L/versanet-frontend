import { useFetch } from "@/common/hooks/useFetch"
import { useState, useEffect } from "react";
import { getTraficoService } from "../services/trafic.service";
import { trafico } from "@/common/models/trafico";

export const useTrafico = () => {
    const { fetchData } = useFetch()
    const [trafico, setTrafico] = useState<trafico | null>(null) // Cambia el tipo a `trafico | null`
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTrafico = async () => {
            try {
                const response = await getTraficoService(fetchData)()
                setTrafico(response)
            } catch (error) {
                console.error("Error al obtener las estadísticas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrafico();
    }, []);

    return { trafico, loading };
}