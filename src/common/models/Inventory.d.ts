export interface Inventory {
  id: string;
  reference: string;
  mac?: string;
  network_address?: string;
  type: string;
  quantity: number;
  status: "activo" | "inactivo" | "mantenimiento";
  createdAt?: string;
  updatedAt?: string;
}

export interface InventoryCreate {
  reference: string;
  mac?: string;
  network_address?: string;
  type: string;
  quantity: number;
  status: "activo" | "inactivo" | "mantenimiento";
}

export interface InventoryUpdate {
  reference?: string;
  mac?: string;
  network_address?: string;
  type?: string;
  quantity?: number;
  status?: "activo" | "inactivo" | "mantenimiento";
}
