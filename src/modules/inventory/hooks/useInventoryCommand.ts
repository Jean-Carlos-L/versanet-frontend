import { useState } from "react";
import { useFetch } from "@/common/hooks/useFetch";
import { InventoryCreate, InventoryUpdate } from "@/common/models/Inventory";
import { createInventoryService } from "@/modules/inventory/services/createInventory.service";
import { updateInventoryService } from "@/modules/inventory/services/updateInventory.service";
import { deleteInventoryService } from "../services/deleteInventory.service";

export const useInventoryCommand = (refresh?: () => void) => {
    const { fetchData } = useFetch();
    const [loadingAction, setLoadingAction] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    
    const deleteInventory = async (id: string) => {
        try {
            setLoadingAction(true)
            const response = await deleteInventoryService(fetchData)(id)
            if (refresh) {
                refresh();
            }
            alert("Inventario eliminado correctamente")
            return response
        } catch (error) {
            alert(error.message)
        } finally {
            setLoadingAction(false)
        }
    }

    const createInventory = async (inventory: InventoryCreate) => {
        try {
            setLoadingAction(true)
            console.log(inventory)
            const response = await createInventoryService(fetchData)(inventory)
            if (refresh) {
                refresh();
            }
            alert("Inventario creado correctamente")
            console.log(response)
            return response
        } catch (error) {
            alert(error.message)
        } finally {
            setLoadingAction(false)
        }
    }
    
    const updateInventory = async (inventory: InventoryUpdate) => {
        try {
            setLoadingAction(true)
            const response = await updateInventoryService(fetchData)(inventory)
            if (refresh) {
                refresh();
            }
            alert("Inventario actualizado correctamente")
            return response
        } catch (error) {
            alert(error.message)
        } finally {
            setLoadingAction(false)
        }
    }


    const validations = (inventory: InventoryCreate | InventoryUpdate) => {
        const errors: { [key: string]: string } = {}
        if(!inventory.reference){
            errors.reference = "El campo referencia es requerido"
        }
        if(!inventory.typeInventory){
            errors.typeInventory = "El campo tipo de inventario es requerido"
        }
        if (!inventory.ip && inventory.typeInventory.id === "1") {
            errors.ip = "El campo IP es requerido"
        }
        if(!inventory.mac){
            errors.mac = "El campo MAC es requerido"
        }
        const hasErrors = Object.keys(errors).length > 0
        setErrors(errors)

        return {hasErrors, errors}
    }
    return {
        createInventory,
        updateInventory,
        validations,
        deleteInventory,
        loadingAction,
        errors
    }
};