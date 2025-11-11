import { useEffect, useState } from "react";
import Modal from "@/common/components/Modal";
import FormInventory from "./components/FormInventory";
import { InventoryUpdate } from "@/common/models/Inventory";
import { useInventoryCommand } from "./hooks/useInventoryCommand";
import { useInventoryById } from "./hooks/useInventoryById";

function EditInventory({ isOpen, onClose, inventoryId, onRefresh }) {
    const { inventory} = useInventoryById(inventoryId);
    const { updateInventory, loadingAction } = useInventoryCommand();
    const [inventoryUpdate, setInventoryUpdate] = useState<InventoryUpdate>({
        id: "",
        referencia: "",
        mac: "",
        direccion_red: "",
        tipo_equipo: "",
        cantidad: 0,
        estado: "inactivo",
    });
    useEffect(() => {
        if (inventory) {
            setInventoryUpdate({
                id: inventory.id,
                referencia: inventory.referencia,
                mac: inventory.mac,
                direccion_red: inventory.direccion_red,
                tipo_equipo: inventory.tipo_equipo,
                cantidad: inventory.cantidad,
                estado: inventory.estado === "activo" ? "activo" : "inactivo",
            });
        }
    }, [inventory]);

    const handleChange = (updatedInventory: InventoryUpdate) => {
        setInventoryUpdate(updatedInventory);
        onRefresh();
    };

    const handleSubmit = () => {
        if (!loadingAction) {
            updateInventory(inventoryUpdate);
            onRefresh();
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Editar Inventario</h2>
            <FormInventory
                inventory={inventoryUpdate}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </Modal>
    );
    
}

export default EditInventory;