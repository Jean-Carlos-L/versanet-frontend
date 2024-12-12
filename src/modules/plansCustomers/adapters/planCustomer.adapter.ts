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
      inventoryMac: {
         id: planCustomer.inventoryMac.id,
         reference: planCustomer.inventoryMac.reference,
         mac: planCustomer.inventoryMac.mac,
         ip: planCustomer.inventoryMac.ip,
         type: planCustomer.inventoryMac.type,
         status: planCustomer.inventoryMac.status,
      },
      inventoryRouter: {
         id: planCustomer.inventoryRouter.id,
         reference: planCustomer.inventoryRouter.reference,
         mac: planCustomer.inventoryRouter.mac,
         ip: planCustomer.inventoryRouter.ip,
         type: planCustomer.inventoryRouter.type,
         status: planCustomer.inventoryRouter.status,
      },
      status: planCustomer.status,
      startDate: planCustomer.startDate,
      endDate: planCustomer.endDate,
   };
}