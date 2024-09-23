import { User } from "@/common/models/User";

export const UserAdapter = (data): User => {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    password: data.password,
    status: data.status,
    roles: data.roles,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};
