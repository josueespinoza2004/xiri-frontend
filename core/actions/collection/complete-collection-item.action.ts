import { xiriApi } from "@/core/api/xiri-api";
import { FoodCollectionResponse } from "@/infrastructure/interfaces/food-collection-response.interface";
import { FoodCollectionMapper } from "@/infrastructure/mappers/food-collection.mapper";

export const completeCollectionItemAction = async (itemId: number) => {
  try {
    const { data } = await xiriApi.patch<FoodCollectionResponse>(
      `/businesscollections/${itemId}/`,
      { complete: true },
    );

    return FoodCollectionMapper.fromResponse(data);
  } catch (error) {
    console.log(error);
    throw "No se pudo marcar como completada";
  }
};
