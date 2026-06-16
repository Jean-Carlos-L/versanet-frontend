import { Plan } from "@/common/models/Plan";
import { planAdapter } from "../adapters/plan.adapter";
import { FetchData } from "@/common/hooks/useFetch";

export const getPlanByIdService =
  (fetchData: FetchData) =>
  async (id: string): Promise<Plan> => {
    try {
      const response = await fetchData<void, Plan>({
        url: `/api/plans/${id}`,
      });

      return planAdapter(response.data);
    } catch (error) {
      throw new Error("Error fetching plan");
    }
  };
