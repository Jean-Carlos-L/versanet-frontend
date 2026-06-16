import { FetchData } from "@/common/hooks/useFetch";

export const deleteContractService = (fetch: FetchData) => async (id: string) => {
  try {
    const response = await fetch({
      url: `/api/contracts/${id}`,
      method: "delete",
    });
    return response.data; // { success: true }
  } catch (error) {
    throw new Error(error?.response?.data?.error || "Ocurrió un error al eliminar el contrato");
  }
};
