import { FetchData } from "@/common/hooks/useFetch";
import { ActivityLog } from "@/common/models/ActivityLog";
import { activityLogAdapter } from "../adapters/activityLog.adapter";
import { FiltersActivityLog } from "../hooks/useFilters";

interface ResponseData {
    data: ActivityLog[];
    pagination: {
        total: number;
        page: number;
        totalPages: number;
    }
}

export const getActivityLogsService =
    (fetch: FetchData) => async (
        filters: FiltersActivityLog,
        page?: number,
        pageSize?: number
    ): Promise<ResponseData> => {
        try {
            // Map frontend filter keys to backend query params
            const params: Record<string, any> = {};
            if (page !== undefined && page !== null) params.page = page;
            if (pageSize !== undefined && pageSize !== null) params.limit = pageSize;

            if (filters) {
                if (filters.entity) params.entity = filters.entity;
                if (filters.action) params.action = filters.action;
                if (filters.actorName) params.actor_name = filters.actorName;
                if ((filters as any).actorId) params.actor_id = (filters as any).actorId;
                if ((filters as any).q) params.q = (filters as any).q;
                if (filters.dateFrom) params.from = filters.dateFrom;
                if (filters.dateTo) params.to = filters.dateTo;
            }

            const searchParams = new URLSearchParams(
                Object.entries(params)
                    .filter(([, v]) => v !== undefined && v !== null && v !== "")
                    .map(([k, v]) => [k, v.toString()])
            ).toString();

            interface ResponseApi {
                data: ActivityLog[];
                page: number;
                total: number;
                totalPages: number;
                pageSize: number;
            }

            const response = await fetch<void, ResponseApi>({
                url: `/api/activity-logs?${searchParams}`,
            });

            return {
                data: response.data.data.map(activityLogAdapter),
                pagination: {
                    total: response.data.total,
                    page: response.data.page,
                    totalPages: response.data.totalPages,
                },
            };
        } catch (error) {
            throw new Error("Error fetching activity logs: " + error);
        }
    };