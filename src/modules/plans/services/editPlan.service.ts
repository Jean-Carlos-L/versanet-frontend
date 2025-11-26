import { FetchData } from "@/common/hooks/useFetch";
import { Plan } from "@/common/models/Plan";

export const editPlanService =
  (fetch: FetchData) =>
  async (id: string, plan: Plan): Promise<Plan> => {
    try {
      const response = await fetch<Plan, Plan>({
        url: `/api/plans/${id}`,
        method: "put",
        body: plan,
      });

      return response.data;
    } catch (error) {
      throw new Error("Error editing plan");
    }
  };
