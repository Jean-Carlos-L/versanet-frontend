//vamos a traer la activity log con los filtros aplicados desde useFilters

import { ActivityLog } from "@/common/models/ActivityLog";
import { useEffect, useState } from "react";
import { getActivityLogsService } from "../services/getActivityLogs.service";
import { FiltersActivityLog } from "./useFilters";
import { useFetch } from "@/common/hooks/useFetch";

export const useActivityLogsQuery = (filters?: FiltersActivityLog) => {
    const { fetchData } = useFetch();
    const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const getActivityLogs = async () => {
        try{
            setLoading(true);
            const response = await getActivityLogsService(fetchData)({
                ...filters,
            }, page, pageSize);
            setActivityLogs(response.data);
            setTotalPages(response.pagination.totalPages);
            setTotal(response.pagination.total);
        } catch (error) {
            console.error("Error fetching activity logs:", error);
        } finally {
            setLoading(false);
            }
        };
        useEffect(() => {
        getActivityLogs();
    }, [filters, page, pageSize, refresh]);
    return {
        activityLogs,
        loading,
        page,
        setPage,
        pageSize,
        setPageSize,
        totalPages,
        total,
        refreshData: () => setRefresh((prev) => !prev),
    };
} 

