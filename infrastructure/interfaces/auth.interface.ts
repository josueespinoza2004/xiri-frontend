export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  contact_number?: string;
  country?: string;
  rol?: string;
}

export interface RegisterResponse {
  mensaje: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  country: string;
  rol: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  contact_number: string;
  country: string;
  rol: string;
}
