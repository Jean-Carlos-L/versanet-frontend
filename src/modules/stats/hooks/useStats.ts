// hooks/useStats.ts (o donde se obtengan los datos)
import { useFetch } from "@/common/hooks/useFetch"
import { useState, useEffect } from "react";
import { getStatsService } from "../services/stats.service";
import { Stats } from "@/common/models/stats";

export const useStats = () => {
    const { fetchData } = useFetch()
    const [stats, setStats] = useState<Stats | null>(null) // Cambia el tipo a `Stats | null`
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getStatsService(fetchData)()
                setStats(response)
            } catch (error) {
                console.error("Error al obtener las estadísticas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading };
};
