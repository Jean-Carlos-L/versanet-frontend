import { useState } from "react";
import { useFetch } from "@/common/hooks/useFetch";
import { PlanCustomerCreate, PlanCustomerUpdate } from "@/common/models/PlanCustomer";
import { enablePlanCustomerService } from "../services/enablePlanCustomer.service";
import { disablePlanCustomerService } from "../services/disablePlanCustomer.service";
import { createPlanCustomerService } from "../services/createPlanCustomer.service";
import { deletePlanCustomerService } from "../services/deletePlanCustomer.service";
import { updatePlanCustomerService } from "../services/updatePlanCustomer.service";

export const usePlansCustomersCommand = (refresh?: () => void) => {
   const { fetchData } = useFetch();
   const [loadingAction, setLoadingAction] = useState(false);
   const [errors, setErrors] = useState<{ [key: string]: string }>({})

   const deletePlanCustomer = async (id: string) => {
      try {
         setLoadingAction(true)
         const response = await deletePlanCustomerService(fetchData)(id)
         if (refresh) {
            refresh();
         }
         alert("Plan del cliente eliminado correctamente")
         return response
      } catch (error) {
         alert(error.message)
      } finally {
         setLoadingAction(false)
      }
   }

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
   
   const createPlanCustomer = async (planCustomer: PlanCustomerCreate) => {
      try {
         setLoadingAction(true)
         const response = await createPlanCustomerService(fetchData)(planCustomer)
         if (refresh) {
            refresh();
         }
         alert("Plan del cliente creado correctamente")
         return response
      } catch (error) {
         alert(error.message)
      } finally {
         setLoadingAction(false)
      }
   }
   const updatePlanCustomer = async (planCustomer: PlanCustomerUpdate) => {
      try {
         setLoadingAction(true)
         const response = await updatePlanCustomerService(fetchData)(planCustomer)
         if (refresh) {
            refresh();
         }
         alert("Plan del cliente actualizado correctamente")
         return response
      } catch (error) {
         alert(error.message)
      } finally {
         setLoadingAction(false)
      }
   }
   const validations = (planCustomer: PlanCustomerCreate | PlanCustomerUpdate) => {
      const errors: { [key: string]: string } = {}

      if (!planCustomer.customer) {
         errors.customerId = "El cliente es requerido"
      }

      if (!planCustomer.plan) {
         errors.planId = "El plan es requerido"
      }

      if (!planCustomer.mac) {
         errors.mac = "La dirección MAC es requerida"
      }

      if (!planCustomer.staticIp) {
         errors.staticIp = "La IP estática es requerida"
      }

      if (!planCustomer.startDate) {
         errors.startDate = "La fecha de inicio es requerida"
      }

      if (!planCustomer.endDate) {
         errors.endDate = "La fecha de fin es requerida"
      }

      if (planCustomer.startDate && planCustomer.endDate && planCustomer.startDate > planCustomer.endDate) {
         errors.startDate = "La fecha de inicio no puede ser mayor a la fecha de fin"
      }
      const hasErrors = Object.keys(errors).length > 0
      setErrors(errors)
      return { hasErrors, errors }
   }


   return {
      createPlanCustomer,
      deletePlanCustomer,
      updatePlanCustomer,
      enablePlan,
      disablePlan,
      validations,
      loadingAction,
      errors
   }
}