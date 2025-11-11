// En adapters/inventory.adapter.ts
import { Inventory } from "@/common/models/Inventory";

export const inventoryAdapter = (inventory: any): Inventory => {
    return {
        id: inventory.id,
        referencia: inventory.referencia || inventory.reference || '',  
        mac: inventory.mac || '',  
        direccion_red: inventory.direccion_red || inventory.ip || '', 
        tipo_equipo: inventory.tipo_equipo || 'otros',  
        cantidad: inventory.cantidad || 1,
        estado: inventory.estado || 'activo', 
        createdAt: inventory.createdAt,
        updatedAt: inventory.updatedAt,
    };
};
