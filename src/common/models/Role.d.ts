export interface Role {
   id: string;
   description: string;
   status: string;
   permissions: { id: string, description: string, code: string }[];
   updatedAt?: Date;
}

export interface RoleCreate {
   description: string;
   status: string;
   permissions: string[];
}

export interface RoleUpdate extends RoleCreate {
   id: string;
}