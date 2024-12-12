import { useState } from "react";
import Modal from "@/common/components/Modal";
import FormInventory from "./components/FormInventory";
import { InventoryCreate } from "@/common/models/Inventory";
import { useInventoryCommand } from "./hooks/useInventoryCommand";

function CreateInventory ({ isOpen, onClose, onRefresh }) {

    const [inventory, setInventory] = useState<InventoryCreate>({
        reference: "",
        mac: "",
        ip: "",
        typeInventory: { id: "" },
        status: 0,
    });

    const { createInventory, loadingAction } = useInventoryCommand();

    const handleChange = (inventory: InventoryCreate) => {
        setInventory(inventory);
    }

    const handleSubmit = async () => {
        if (!loadingAction) {
            if (inventory.typeInventory.id !== "1" && !inventory.ip) {
                inventory.ip = null;
            }
            await createInventory(inventory).then(() => {
                setInventory({
                    reference: "",
                    mac: "",
                    ip: "",
                    typeInventory: { id: "" },
                    status: 0,
                });
                onRefresh();
                onClose();
            });
        }
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Crear Inventario</h2>
            <FormInventory
                inventory={inventory}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </Modal>
    )
}

export default CreateInventory;