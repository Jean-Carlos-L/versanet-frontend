import { FetchData } from "@/common/hooks/useFetch";
import { Plan } from "@/common/models/Plan";
import { planAdapter } from "../adapters/plan.adapter";

interface Response {
   data: Plan[];
   currentPage: number;
   total: number;
   pages: number;
}

export const getPlansService =
  (fetch: FetchData) =>
  async (filters: Record<string, any>): Promise<Response> => {
    try {
      interface ResponseFetch {
        data: Plan[];
        metadata: {
            currentPage: number;
            total: number;
            pages: number;
        }
      }

      const searchParams = new URLSearchParams(filters).toString();

      const response = await fetch<void, ResponseFetch>({
        url: `/api/plans?${searchParams}`,
      });

      return {
         data: response.data.data.map(planAdapter),
         currentPage: response.data.metadata.currentPage,
         total: response.data.metadata.total,
         pages: response.data.metadata.pages,
      }
    } catch (error) {
      console.error("Error al obtener los planes:", error);
      throw new Error(
        error.response?.data?.message ||
          "Ocurrió un error al obtener los planes"
      );
    }
  };
