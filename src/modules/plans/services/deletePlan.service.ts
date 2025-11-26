import { FetchData } from "@/common/hooks/useFetch";

export const deletePlanService =
  (fetch: FetchData) =>
  async (id: string): Promise<void> => {
    try {
      await fetch<void, void>({
        url: `/api/plans/${id}`,
        method: "delete",
      });
    } catch (error) {
      throw new Error("Error deleting plan");
    }
  };
