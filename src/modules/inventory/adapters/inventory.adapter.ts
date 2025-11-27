// En adapters/inventory.adapter.ts
import { Inventory } from "@/common/models/Inventory";

export const inventoryAdapter = (inventory: any): Inventory => {
    return {
        id: inventory.id,
        reference: inventory.referencia || inventory.reference || '',  
        mac: inventory.mac || '',  
        network_address: inventory.direccion_red || inventory.ip || '', 
        type: inventory.tipo_equipo || 'otros',  
        quantity: inventory.cantidad || 1,
        status: inventory.estado || 'activo', 
        createdAt: inventory.createdAt,
        updatedAt: inventory.updatedAt,
    };
};
