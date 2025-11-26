import { inventoryAdapter } from './../adapters/inventory.adapter';
import { Inventory } from "@/common/models/Inventory";
import { FetchData } from "@/common/hooks/useFetch";


export const getInventoryByIdService = (fetch: FetchData) => async (id: string): Promise<Inventory> => {
    try {
        interface typeResponse { data: any, message: string }
        const response = await fetch<void, typeResponse>({
            url: `/api/inventory/${id}`,
            method: "get"
        });

        const raw: any = response?.data;
        const item = raw?.data ?? raw;

        if (!item) {
            throw new Error("No se encontró el inventario");
        }

        return inventoryAdapter(item);
    } catch (error) {
        console.error(error);
        throw new Error(
            error?.response?.data?.message ||
            "Ocurrió un error al obtener el inventario"
        );
    }
}