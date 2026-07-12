// Respuesta directa del API Django para Department
export interface DepartmentResponse {
  id: number;
  name: string;
  description: string;
  latitude: string; // Django DecimalField devuelve string
  longitude: string;
}

// Respuesta directa del API Django para Food
export interface FoodResponse {
  id: number;
  name: string;
  description: string;
  image: string;
  cultural_origin: string;
  department_origin: number;
}
