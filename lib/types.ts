export type UserRole = "ADMIN" | "USER"

export interface User {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    gender: string;
    createdAt: string;
    role: UserRole;
  };
  token: string;
}

export interface Utilisateur {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: string;
  createdAt: string;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  role: UserRole;
}
