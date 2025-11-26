
export interface Inventory {
    id: string;
    referencia: string; 
    mac?: string;        
    direccion_red?: string;  
    tipo_equipo: string;     
    cantidad: number;        
    estado: string;          
    createdAt?: string;      
    updatedAt?: string;      
}

export interface InventoryCreate {
    referencia: string;
    mac?: string;
    direccion_red?: string;
    tipo_equipo: string;
    cantidad: number;
    estado: "activo" | "inactivo";  
}

export interface InventoryUpdate extends InventoryCreate {
    id: string;
}
