import { FetchData } from "@/common/hooks/useFetch";
import { ContractUpdate } from "@/common/models/Contract";

export const updateContractService = (fetch: FetchData) => async (contract: ContractUpdate) => {
  try {
    const response = await fetch({
      url: `/api/contracts/${contract.id}`,
      method: "put",
      body: contract,
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.error || "Ocurrió un error al actualizar el contrato");
  }
};
