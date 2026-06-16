import { FetchData } from "@/common/hooks/useFetch";
import { Plan } from "@/common/models/Plan";

export const createPlanService =
  (fetch: FetchData) =>
  async (plan: Plan): Promise<Plan> => {
    try {
      const response = await fetch<Plan, Plan>({
        url: `/api/plans`,
        method: "post",
        body: plan,
      });

      return response.data;
    } catch (error) {
      throw new Error("Error creating plan");
    }
  };
