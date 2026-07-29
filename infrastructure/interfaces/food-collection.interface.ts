export interface FoodCollection {
  id: number;
  user: number;
  traditionalFood: number;
  foodName: string;
  departmentName: string;
  foodImage: string | null;
  complete: boolean;
  registeredDate: string;
}
