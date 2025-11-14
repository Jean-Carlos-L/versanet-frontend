import { FetchData } from "@/common/hooks/useFetch";

export const getContractByIdService = (fetch: FetchData) => async (id: string) => {
  try {
    const response = await fetch({
      url: `/api/contracts/${id}`,
      method: "get"
    });
    return response.data; // Backend retorna full contract
  } catch (error) {
    throw new Error(error?.response?.data?.error || "Ocurrió un error al obtener el contrato");
  }
};
