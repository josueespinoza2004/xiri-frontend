import { xiriApi } from "@/core/api/xiri-api";
import { FoodCollectionResponse } from "@/infrastructure/interfaces/food-collection-response.interface";
import { FoodCollectionMapper } from "@/infrastructure/mappers/food-collection.mapper";

export const addToCollectionAction = async (foodId: number) => {
  try {
    const { data } = await xiriApi.post<FoodCollectionResponse>(
      "/businesscollections/",
      { food: foodId },
    );

    return FoodCollectionMapper.fromResponse(data);
  } catch (error) {
    console.log(error);
    throw "No se pudo agregar a la colección";
  }
};
