import { FetchData } from "@/common/hooks/useFetch";

export const getNumberHistory =
  (fetch: FetchData) =>
  async (entity: string): Promise<number> => {
    try {
      interface Response {
        data: number;
        message: string;
      }
      const response = await fetch<void, Response>({
        url: `/api/history/count/${entity}`,
        method: "get",
      });
      return response.data.data;
    } catch (error) {
      console.error("Error al obtener el número de planes:", error);
      throw new Error(
        error.response?.data?.message ||
          "Ocurrió un error al obtener el número de planes"
      );
    }
  };
