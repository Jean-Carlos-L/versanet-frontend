import { FetchData } from "@/common/hooks/useFetch";
import { ContractCreate } from "@/common/models/Contract";
import { contractAdapter } from "../adapters/contract.adapter";

export const createContractService = (fetch: FetchData) => async (Contract: ContractCreate) => {
    try{
        const inventoryId = Contract.inventory_id || null;
        const payload = {
            customer_id: Contract.customer_id,
            plan_id: Contract.plan_id,
            start_date: Contract.start_date,
            end_date: Contract.end_date,
            inventory_id: inventoryId,
            status: Contract.status

        };

        const response = await fetch({
            url: "/api/contracts",
            method: "post",
            body: payload
        });

        const raw: any = response?.data;
        const item = raw?.data ?? raw;
        return contractAdapter(item);
    }catch(error){
        throw new Error(
            error?.response?.data?.message || "Ocurrió un error al crear el contrato"
        );
    }
}
