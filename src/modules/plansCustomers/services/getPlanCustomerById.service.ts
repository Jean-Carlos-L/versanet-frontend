import { planCustomerAdapter } from './../adapters/planCustomer.adapter';
import { PlanCustomer } from "@/common/models/PlanCustomer";
import { FetchData } from "@/common/hooks/useFetch";

export const getPlanCustomerByIdService = (fetch: FetchData) => async (id: string): Promise<PlanCustomer> => {
    try {
        interface typeResponse { data: PlanCustomer, message: string }
        const response = await fetch<void, typeResponse>({
            url: `/api/plans-customers/${id}`,
            method: "get"
        })
        return planCustomerAdapter(response.data.data);
    } catch (error) {
        console.error(error);
        throw new Error(
            error?.response?.data?.message ||
            "Ocurrió un error al obtener el plan del cliente"
        );
    }
}