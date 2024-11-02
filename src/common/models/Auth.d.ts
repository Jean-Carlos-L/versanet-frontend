export interface Auth {
  email: string;
  password: string;
  permmisions?: string[];
}

export interface AuthResponse {
  token: string;
  permissions: string[];
  isAuth?: boolean;
}
