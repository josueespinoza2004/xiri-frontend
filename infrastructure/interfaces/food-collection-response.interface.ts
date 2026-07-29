export interface FoodCollectionResponse {
  id: number;
  user: number;
  traditional_food: number;
  food_name: string;
  department_name: string;
  food_image: string | null;
  complete: boolean;
  registered_date: string;
}
