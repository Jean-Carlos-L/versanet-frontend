import { FetchData } from "@/common/hooks/useFetch";

interface ResponseData {
  users: number;
  customers: number;
  contracts: number;
  invoices: number;
}

export const getCountEntitiesService =
  (fetch: FetchData) => async (): Promise<ResponseData> => {
    try {
      interface ResponseApi {
        data: ResponseData;
      }

      const response = await fetch<void, ResponseApi>({
        url: "/api/stats/count-entities",
      });
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error fetching entity counts"
      );
    }
  };
