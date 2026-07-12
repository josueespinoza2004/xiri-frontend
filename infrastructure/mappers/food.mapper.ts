import { Food } from "../interfaces/gastronomy.interface";
import { FoodResponse } from "../interfaces/gastronomy-response.interface";

export class FoodMapper {
  static fromFoodResponse = (food: FoodResponse): Food => {
    return {
      id: food.id,
      name: food.name,
      description: food.description,
      image: food.image,
      culturalOrigin: food.cultural_origin,
      departmentOrigin: food.department_origin,
    };
  };
}
