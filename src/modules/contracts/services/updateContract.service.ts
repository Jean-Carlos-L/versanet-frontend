import { FetchData } from "@/common/hooks/useFetch";
import { ContractUpdate } from "@/common/models/Contract";

export const updateContractService = (fetch: FetchData) => async (contract: ContractUpdate) => {
  try {
    // Build payload only with provided fields to avoid sending undefined values.
    const payload: any = {};
    if (contract.customer_id !== undefined) payload.customer_id = contract.customer_id;
    if (contract.plan_id !== undefined) payload.plan_id = contract.plan_id;
    if (contract.start_date !== undefined) payload.start_date = contract.start_date;
    if (contract.end_date !== undefined) payload.end_date = contract.end_date;
    if (contract.inventory_id !== undefined) payload.inventory_id = contract.inventory_id;
    if (contract.status !== undefined) payload.status = contract.status;
    const response = await fetch({
      url: `/api/contracts/${contract.id}`,
      method: "put",
      body: payload
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.error || "Ocurrió un error al actualizar el contrato");
  }
};
