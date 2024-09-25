import { Role } from "@/common/models/Role";

export const roleAdapter = (data): Role => {
   return {
      id: data.id,
      description: data.description,
      status: data.status,
      permissions: data.permissions,
      updatedAt: data.updatedAt
   }
}