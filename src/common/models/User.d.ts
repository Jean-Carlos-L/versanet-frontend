export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  status: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreate {
  name: string;
  email?: string;
  password: string;
  confirmPassword: string;
  status?: string;
  role?: string;
}

export interface UserUpdate extends UserCreate {
  id: string;
}
