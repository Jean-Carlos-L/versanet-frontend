import { FetchData } from "@/common/hooks/useFetch";

export const toggleStatusService =
  (fetch: FetchData) =>
  async (id: string): Promise<void> => {
    try {
      const response = await fetch<void, any>({
        url: `/api/contracts/${id}/toggle-status/`,
        method: "patch",
      });
      return response?.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Ocurrió un error al cambiar el estado del contrato"
      );
    }
  };
