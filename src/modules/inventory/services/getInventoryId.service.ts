import { inventoryAdapter } from './../adapters/inventory.adapter';
import { Inventory } from "@/common/models/Inventory";
import { FetchData } from "@/common/hooks/useFetch";


export const getInventoryByIdService = (fetch: FetchData) => async (id: string): Promise<Inventory> => {
    try {
        interface typeResponse { data: Inventory, message: string }
        const response = await fetch<void, typeResponse>({
            url: `/api/inventario/${id}`,
            method: "get"
        })
        return inventoryAdapter(response.data.data);
    } catch (error) {
        console.error(error);
        throw new Error(
            error?.response?.data?.message ||
            "Ocurrió un error al obtener el inventario"
        );
    }
}