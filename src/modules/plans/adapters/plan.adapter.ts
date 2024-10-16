import { Plan } from "@/common/models/Plan";

export const planAdapter = (plan): Plan => {
   return {
      id: plan.id,
      description: plan.description,
      features: plan.features,
      price: plan.price,
      status: plan.status,
      createdAt: plan.createdAt,
   }
}