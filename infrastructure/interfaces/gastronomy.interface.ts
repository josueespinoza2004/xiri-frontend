export interface Department {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

export interface Food {
  id: number;
  name: string;
  description: string;
  image: string;
  culturalOrigin: string;
  departmentOrigin: number;
}
