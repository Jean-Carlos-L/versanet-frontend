import { FetchData } from "@/common/hooks/useFetch";
import { Contract } from "@/common/models/Contract";

export const getContractByIdService =
  (fetch: FetchData) =>
  async (id: string): Promise<Contract> => {
    try {
      const response = await fetch<void, Contract>({
        url: `/api/contracts/${id}`,
        method: "get",
      });

      return response.data; // Backend retorna full contract
    } catch (error) {
      throw new Error(
        error?.response?.data?.error ||
          "Ocurrió un error al obtener el contrato"
      );
    }
  };
