export interface Auth {
  email: string;
  password: string;
  permmisions?: string[];
}

export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  permissions: string[];
}
