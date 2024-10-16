import { useFetch } from "@/common/hooks/useFetch";
import { enablePlanCustomerService } from "../services/enablePlanCustomer.service";
import { disablePlanCustomerService } from "../services/disablePlanCustomer.service";

export const usePlansCustoermsCommand = (refresh?: () => void) => {
   const { fetchData } = useFetch();

   const enablePlan = async (id: string) => {
      try {
         const response = await enablePlanCustomerService(fetchData)(id);
         if (refresh) refresh();
         alert(response);
      } catch (error) {
         console.error("Error al habilitar el plan del cliente:", error);
         alert(error.message)
         throw new Error(
            error.message
         );
      }
   }

   const disablePlan = async (id: string) => {
      try {
         const response = await disablePlanCustomerService(fetchData)(id);
         if (refresh) refresh();
         alert(response);
      } catch (error) {
         console.error("Error al deshabilitar el plan del cliente:", error);
         alert(error.message)
         throw new Error(
            error.message
         );
      }
   }

   return {
      enablePlan,
      disablePlan,
   }
}