// Respuesta directa del API Django para Department
export interface DepartmentResponse {
  id: number;
  name: string;
  description: string;
  latitude: string;
  longitude: string;
}

// Respuesta directa del API Django para TraditionalFood
export interface FoodResponse {
  id: number;
  name: string;
  description: string;
  image: string;
  cultural_origin: string;
  department_origin: number;
  department_name: string;
  created_at: string;
}
