export interface Auth {
  email: string;
  password: string;
  permmisions?: string[];
}

export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  role: {
    id: string;
    description: string;
    permissions: {
      id: string;
      description: string;
      code: string;
    };
  };
}
  