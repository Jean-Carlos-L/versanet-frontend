import { FetchData } from "@/common/hooks/useFetch";
import { InventoryUpdate } from "@/common/models/Inventory";

export const updateInventoryService = (fetch: FetchData) => async (id: string, inventory: InventoryUpdate) => {
    try{
        const response = await fetch({
            url: `/api/inventory/${id}`,
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