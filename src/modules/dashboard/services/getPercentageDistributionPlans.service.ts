import { FetchData } from "@/common/hooks/useFetch";

type ResponseData = {
  plan: string;
  percentage: number;
}[];

export const getPercentageDistributionPlansService =
  (fetch: FetchData) => async (): Promise<ResponseData> => {
    try {
      interface ResponseApi {
        data: ResponseData;
      }

      const response = await fetch<void, ResponseApi>({
        url: "/api/stats/percentage-distribution-plans",
      });
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Error fetching percentage distribution of plans"
      );
    }
  };
