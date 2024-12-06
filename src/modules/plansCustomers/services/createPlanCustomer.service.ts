import { FetchData } from "@/common/hooks/useFetch";
import { PlanCustomerCreate } from "@/common/models/PlanCustomer";

export const createPlanCustomerService = (fetch: FetchData) => async (planCustomer: PlanCustomerCreate) => {
    console.log("PlanCustomer")
    console.log(planCustomer);
    try{
        const response = await fetch({
            url: "/api/plans-customers",
            method: "post",
            body: planCustomer
        });
        //quiero ver el body
        console.log("Body")
        console.log(planCustomer);
        return response.data;
    }catch(error){
        throw new Error(
            error?.response?.data?.message || "Ocurrió un error al crear el plan del cliente"
        );
    }
}