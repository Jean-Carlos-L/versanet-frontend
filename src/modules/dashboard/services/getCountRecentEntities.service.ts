import { FetchData } from "@/common/hooks/useFetch";

interface ResponseData {
  customers: {
    thisMonth: number;
    percentageChange: number;
  };
  contracts: {
    thisMonth: number;
    percentageChange: number;
  };
  invoices: {
    thisMonth: number;
    percentageChange: number;
  };
}

export const getCountRecentEntitiesService =
  (fetch: FetchData) => async (): Promise<ResponseData> => {
    try {
      interface ResponseApi {
        data: ResponseData;
      }

      const response = await fetch<void, ResponseApi>({
        url: "/api/stats/count-recent-entities",
      });
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error fetching entity counts"
      );
    }
  };
