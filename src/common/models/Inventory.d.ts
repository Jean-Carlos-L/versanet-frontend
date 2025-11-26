
export interface Inventory {
    id: string;
    reference: string;
    mac?: string;
    network_address?: string;
    type: string;
    quantity: number;
    status: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface InventoryCreate {
    reference: string;
    mac?: string;
    network_address?: string;
    type: string;
    quantity: number;
    status: "active" | "inactive";
}

export interface InventoryUpdate extends InventoryCreate {
    id: string;
}
