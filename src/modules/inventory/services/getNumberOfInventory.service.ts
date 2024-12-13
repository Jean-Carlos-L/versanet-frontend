import { FetchData } from "@/common/hooks/useFetch";
import { FiltersInventory } from "../hooks/useFilters";

export const getNumberOfInventoryService = (fetch: FetchData) => async (filters: FiltersInventory): Promise<number> => {
    try {
        const searchParams = new URLSearchParams(Object.entries(filters)).toString();
        interface Response {
            data: number;
            message: string;
        }

        const response = await fetch<void, Response>({ url: `/api/inventario/count?${searchParams}` });
        return response.data.data;
    } catch (error) {
        console.error("Error al obtener el número de inventario:", error);
        throw new Error(
            error.response?.data?.message ||
            "Ocurrió un error al obtener el número de inventario"
        );
    }
}