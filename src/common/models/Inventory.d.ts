export interface Inventory {
    id: string;
    reference: string;
    mac: string;
    ip: string;
    status: number;
    typeInventory: {
        id: string;
        description: string;
    };
}
export interface InventoryCreate {
    reference: string;
    mac: string;
    ip: string;
    status: number;
    typeInventory: {
        id: string;
    };
}
export interface InventoryUpdate extends InventoryCreate {
    id: string;
}
