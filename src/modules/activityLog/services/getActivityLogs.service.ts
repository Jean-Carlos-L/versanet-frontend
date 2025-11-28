import { FetchData } from "@/common/hooks/useFetch";
import { ActivityLog } from "@/common/models/ActivityLog";
import { activityLogAdapter } from "../adapters/activityLog.adapter";

interface ResponseApiRows {
  rows: any[];
  count: number;
}

type Filters = {
  id?: string;
  entity?: string;
  actor_id?: string;
  action?: string;
  actor_name?: string;
  q?: string;
  from?: string;
  to?: string;
};

export const getActivityLogsService = (fetch: FetchData) =>
  async (
    filters: Filters = {},
    page: number = 1,
    limit: number = 20
  ): Promise<{
    data: ActivityLog[];
    pagination: { total: number; page: number; limit: number };
  }> => {
    try {
      const offset = (page - 1) * limit;

      const entries: [string, string][] = Object.entries({
        ...filters,
        offset: String(offset),
        limit: String(limit),
      })
        .filter(([, v]) => v !== undefined && v !== null && v !== "")
        .map(([k, v]) => [k, String(v)]);

      const params = new URLSearchParams(entries).toString();

      const response = await fetch<void, ResponseApiRows>({
        url: `/api/activity-logs?${params}`,
      });

      const rows = response.data.rows ?? response.data.data ?? [];
      const count = response.data.count ?? response.data.total ?? 0;

      return {
        data: rows.map(activityLogAdapter),
        pagination: {
          total: count,
          page,
          limit,
        },
      };
    } catch (error: any) {
      console.error("Error al obtener activity logs:", error);
      throw new Error(
        error.response?.data?.message || "Ocurrió un error al obtener los activity logs"
      );
    }
  };
