import { FetchData } from "@/common/hooks/useFetch";
import { InventoryUpdate } from "@/common/models/Inventory";

export const updateInventoryService = (fetch: FetchData) => async (inventory: InventoryUpdate) => {
    try{
        const response = await fetch({
            url: `/api/inventario/${inventory.id}`,
            method: "put",
            body: inventory
        });

        return response.data;
    }catch(error){
        throw new Error(
            error?.response?.data?.message || "Ocurrió un error al actualizar el inventario"
        );
    }

}