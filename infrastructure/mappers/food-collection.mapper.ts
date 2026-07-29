import { FoodCollection } from "../interfaces/food-collection.interface";
import { FoodCollectionResponse } from "../interfaces/food-collection-response.interface";

export class FoodCollectionMapper {
  static fromResponse = (item: FoodCollectionResponse): FoodCollection => {
    return {
      id: item.id,
      user: item.user,
      traditionalFood: item.traditional_food,
      foodName: item.food_name,
      departmentName: item.department_name,
      foodImage: item.food_image,
      complete: item.complete,
      registeredDate: item.registered_date,
    };
  };
}
