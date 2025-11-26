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
        reference: "",
        mac: "",
        network_address: "",
        type: "",
        quantity: 0,
        status: "inactive",
    });
    useEffect(() => {
        if (inventory) {
            setInventoryUpdate({
                id: inventory.id,
                reference: inventory.reference,
                mac: inventory.mac,
                network_address: inventory.network_address,
                type: inventory.type,
                quantity: inventory.quantity,
                status: inventory.status === "active" ? "active" : "inactive",
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