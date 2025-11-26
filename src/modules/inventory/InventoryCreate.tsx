import { useState } from "react";
import Modal from "@/common/components/Modal";
import FormInventory from "./components/FormInventory";
import { InventoryCreate } from "@/common/models/Inventory";
import { useInventoryCommand } from "./hooks/useInventoryCommand";

function CreateInventory ({ isOpen, onClose, onRefresh }) {

    const [inventory, setInventory] = useState<InventoryCreate>({
        // los campos iniciales del inventario
        referencia: "",
        mac: "",
        direccion_red: "",
        tipo_equipo: "",
        cantidad: 1,
        estado: "activo",
    });

    const { createInventory, loadingAction } = useInventoryCommand();

    const handleChange = (inventory: InventoryCreate) => {
        setInventory(inventory);
    }

    const handleSubmit = async () => {
        if (!loadingAction) {
            if (inventory.tipo_equipo !== "1" && !inventory.direccion_red) {
                inventory.direccion_red = null;
            }
            await createInventory(inventory).then(() => {
                setInventory({
                    referencia: "",
                    mac: "",
                    direccion_red: "",
                    tipo_equipo: "",
                    cantidad: 1,
                    estado: "activo",
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