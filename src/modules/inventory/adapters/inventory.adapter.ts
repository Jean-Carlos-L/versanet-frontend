import { Inventory } from "@/common/models/Inventory";

export const inventoryAdapter = (inventory): Inventory => {
    return {
        id: inventory.id,
        reference: inventory.reference,
        mac: inventory.mac,
        ip: inventory.ip,
        status: inventory.status,
        typeInventory: {
            id: inventory.typeInventory.id,
            description: inventory.typeInventory.description,
        },
    };
}