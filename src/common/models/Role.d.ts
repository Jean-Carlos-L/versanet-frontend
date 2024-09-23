export interface Role {
   id: string;
   description: string;
   status: number;
   permissions: { id: string, description: string, url: string }[];
   updatedAt?: Date;
}

export interface RoleCreate {
   description: string;
   status: number;
   permissions: string[];
}

export interface RoleUpdate extends RoleCreate {
   id: string;
}