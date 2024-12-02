import { FetchData } from "@/common/hooks/useFetch";
import { InventoryCreate } from "@/common/models/Inventory";

export const createInventoryService = (fetch: FetchData) => async (inventory: InventoryCreate) => {
    try{
        const response = await fetch({
            url: "/api/inventario",
            method: "post",
            body: inventory
        });
        return response.data;
    }catch(error){
        throw new Error(
            error?.response?.data?.message || "Ocurrió un error al crear el inventario"
        );
    }
}