import { FetchData } from "@/common/hooks/useFetch";
import { Plan } from "@/common/models/Plan";
import { planAdapter } from "../adapters/plan.adapter";

export const getPlansService =
   (fetch: FetchData) => async (): Promise<Plan[]> => {
      try {
         interface Response {
            data: Plan[];
            message: string;
         }
         const response = await fetch<void, Response>({ url: "/api/plans" });
         return response.data.data.map(planAdapter);
      } catch (error) {
         console.error("Error al obtener los planes:", error);
         throw new Error(
            error.respnose?.data?.message ||
            "Ocurrió un error al obtener los planes"
         );
      }
   };
