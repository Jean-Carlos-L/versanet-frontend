export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  status: number;
  roles: Role;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreate {
  name: string;
  email?: string;
  password: string;
  confirmPassword: string;
  status?: number;
  roles?: Role;
}

export interface UserUpdate extends UserCreate {
  id: string;
}
