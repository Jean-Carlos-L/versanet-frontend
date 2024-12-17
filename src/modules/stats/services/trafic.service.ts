import { FetchData } from "@/common/hooks/useFetch";
import { trafico } from "@/common/models/trafico";
import { traficoAdapter } from "../adapters/trafico.adapters";

export const getTraficoService =
    (fetch: FetchData) =>
        async (): Promise<trafico> => {
            try {
                interface typeResponse { data: trafico, message: string }
                const response = await fetch<void, typeResponse>({
                url: `/api/mikrotik/interface-traffic`,
                });
                return traficoAdapter(response.data);
            } catch (error) {
                console.error("Error en getTraficoService:", error);
                throw new Error(
                error?.response?.data?.message ||
                "Ocurrió un error al obtener las estadísticas"
                );
            }
        };