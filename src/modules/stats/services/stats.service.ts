import { FetchData } from "@/common/hooks/useFetch";
import { Stats } from "@/common/models/stats";
import { statsAdapter } from "../adapters/stats.adapters";

export const getStatsService =
   (fetch: FetchData) =>
      async (): Promise<Stats> => {
         try {
            interface typeResponse { data: Stats, message: string }
            const response = await fetch<void, typeResponse>({
               url: `/api/stats`,
            });

            return statsAdapter(response.data.data);
         } catch (error) {
            console.error("Error en getStatsService:", error);
            throw new Error(
               error?.response?.data?.message ||
               "Ocurrió un error al obtener las estadísticas"
            );
         }
      };