import { useEffect, useState } from "react";
import { useFetch } from "@/common/hooks/useFetch";
import { ActivityLog } from "@/common/models/ActivityLog";
import { getActivityLogsService } from "../services/getActivityLogs.service";

type Filters = {
  page: number;
  pageSize: number;
  id?: string;
  entity?: string;
  actor_id?: string;
  action?: string;
  actor_name?: string;
  q?: string;
  date_from?: string;
  date_to?: string;
};

export const useActivityLogsQuery = (
  filtersInit: Filters = { page: 1, pageSize: 20 }
) => {
  const { fetchData } = useFetch();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: filtersInit.page,
    limit: filtersInit.pageSize,
  });
  const [filters, setFilters] = useState<Filters>(filtersInit);

  const fetchLogs = async (
    page = filtersInit.page,
    limit = filtersInit.pageSize,
    extraFilters: Filters = {page: 1, pageSize: 20}
  ) => {
    setLoading(true);
    try {
      const merged = { ...filters, ...extraFilters };
      const response = await getActivityLogsService(fetchData)(merged, page, limit);
      setLogs(response.data);
      setPagination(response.pagination);
      setFilters(merged);
    } catch (error) {
      console.error("Error fetching activity logs", error);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async (page = 1, limit = pagination.limit ?? filtersInit.pageSize) => {
    setLoading(true);
    try {
      // Request unfiltered data (empty filters object) for the given page/limit
      const response = await getActivityLogsService(fetchData)({}, page, limit);
      setLogs(response.data);
      setPagination(response.pagination);
      // Reset filters state to minimal paging state
      setFilters({ page, pageSize: limit } as Filters);
    } catch (error) {
      console.error("Error refreshing activity logs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(filtersInit.page, filtersInit.pageSize, filtersInit);
  }, []);

  return { logs, fetchLogs, refresh, loading, pagination, filters, setFilters };
};
