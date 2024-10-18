import { User } from "@/common/models/User";

export const authAdapter = (data): User => {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role,
    status: data.status,
    updatedAt: data.updatedAt,
  };
};
