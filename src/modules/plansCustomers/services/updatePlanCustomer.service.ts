import { FetchData } from "@/common/hooks/useFetch";
import { PlanCustomerUpdate } from "@/common/models/PlanCustomer";

export const updatePlanCustomerService = (fetch: FetchData) => async (planCustomer: PlanCustomerUpdate) => {
    console.log(planCustomer);
    try{
        const response = await fetch({
            url: `/api/plans-customers/${planCustomer.id}`,
            method: "put",
            body: planCustomer
        });

        return response.data;
    }catch(error){
        throw new Error(
            error?.response?.data?.message || "Ocurrió un error al actualizar el plan del cliente"
        );
    }

}