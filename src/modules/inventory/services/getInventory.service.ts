import { FetchData } from "@/common/hooks/useFetch";
import { FiltersInventory } from "../hooks/useFilters";
import { Inventory } from "@/common/models/Inventory";
import { inventoryAdapter } from "../adapters/inventory.adapter";


export const getInventoryService = (fetch: FetchData) => async (filters: FiltersInventory): Promise<Inventory[]> => {
    try {
        const searchParams = new URLSearchParams(Object.entries(filters)).toString();
        interface Response {
            data: Inventory[];
            message: string;
        }
        const response = await fetch<void, Response>({ url: `/api/inventory?${searchParams}` });

        const raw: any = response?.data;
        const items = Array.isArray(raw?.data?.data)
            ? raw.data.data
            : Array.isArray(raw?.data)
            ? raw.data
            : Array.isArray(raw)
            ? raw
            : [];

        return items.map(inventoryAdapter);
    } catch (error) {
        console.error("Error al obtener el inventario:", error);
        throw new Error(
            error.response?.data?.message ||
            "Ocurrió un error al obtener el inventario"
        );
    }
}
