import { FoodCollection } from "../interfaces/food-collection.interface";
import { FoodCollectionResponse } from "../interfaces/food-collection-response.interface";

export class FoodCollectionMapper {
  static fromResponse = (item: FoodCollectionResponse): FoodCollection => {
    return {
      id: item.id,
      user: item.user,
      food: item.food,
      complete: item.complete,
      registeredDate: item.registered_date,
    };
  };
}
