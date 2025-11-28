import { useState } from "react";
import FormInventory from "./components/FormInventory";
import { useInventoryCommand } from "./hooks/useInventoryCommand";
import Modal from "@/common/components/Modal";
import { InventoryCreate } from "@/common/models/Inventory";


function InventoryCreateModal({ isOpen, onClose, onRefresh }: { isOpen: boolean; onClose: () => void; onRefresh?: () => void }) {
   const [inventory, setInventory] = useState<InventoryCreate>({
        reference: "",
        mac: "",
        network_address: "",
        type: "",
        quantity: 0,
        status: "activo",
    });
    const { createInventory } = useInventoryCommand(onRefresh);
    const handleChange = (key: string, value: any) => {
        setInventory((prev) => ({ ...prev, [key]: value }));
    };
    const handleSubmit = async () => {
        const ok = await createInventory(inventory);
        if (ok) {
            setInventory({
                reference: "",
                mac: "",
                network_address: "",
                type: "",
                quantity: 0,
                status: "activo",
            });
            onClose();
        }
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-lg font-semibold mb-4">Crear Inventario</h2>
            <FormInventory data={inventory} onChange={handleChange} onSubmit={handleSubmit} errors={{}} />
        </Modal>
    );
} 

export default InventoryCreateModal;
