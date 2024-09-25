import { User } from "@/common/models/User";

export const userAdapter = (data): User => {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role ? data.role : null,  // Si idRol es null, devolver null.
    status: data.status,
  };
};
