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
