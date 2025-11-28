import { useEffect, useState } from "react";
import Modal from "@/common/components/Modal";
import FormInventory from "./components/FormInventory";
import { InventoryUpdate } from "@/common/models/Inventory";
import { useInventoryById } from "./hooks/useInventoryById";
import { useInventoryCommand } from "./hooks/useInventoryCommand";

function InventoryEditModal({ isOpen, onClose, inventoryId, onRefresh }){
  const { inventory } = useInventoryById(inventoryId);
  const { updateInventory, loading, errors } = useInventoryCommand(onRefresh);
  const [ inventoryUpdate, setInventoryUpdate] = useState<InventoryUpdate>({
    id: "",
    reference: "",
    mac: "",
    network_address: "",
    type: "",
    quantity: 0,
    status: "activo",
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
        status: inventory.status,
      });
    }
  }, [inventory]);

  const handleChange = (key: string, value: any) => {
    setInventoryUpdate((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmit = async () => {
    if (loading) return;
    const ok = await updateInventory(inventoryUpdate);
    if (ok) onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Editar Inventario</h2>
      <FormInventory
        data={inventoryUpdate}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        errors={errors}
      />
    </Modal>
  );
}

export default InventoryEditModal;