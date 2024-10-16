import { PlanCustomer } from "@/common/models/PlanCustomer";

export const planCustomerAdapter = (planCustomer): PlanCustomer => {
   return {
      id: planCustomer.id,
      customer: {
         id: planCustomer.customer.id,
         name: planCustomer.customer.name,
         document: planCustomer.customer.document,
         email: planCustomer.customer.email,
         phone: planCustomer.customer.phone,
         address: planCustomer.customer.address,
         status: planCustomer.customer.status,
      },
      plan: {
         id: planCustomer.plan.id,
         description: planCustomer.plan.description,
         price: planCustomer.plan.price,
         features: planCustomer.plan.features,
      },
      status: planCustomer.status,
      staticIp: planCustomer.staticIp,
      mac: planCustomer.mac,
      startDate: planCustomer.startDate,
      endDate: planCustomer.endDate,
   };
}