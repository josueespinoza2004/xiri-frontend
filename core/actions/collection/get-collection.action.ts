import { xiriApi } from "@/core/api/xiri-api";
import { FoodCollectionResponse } from "@/infrastructure/interfaces/food-collection-response.interface";
import { FoodCollectionMapper } from "@/infrastructure/mappers/food-collection.mapper";

export const getCollectionAction = async () => {
  try {
    const { data } = await xiriApi.get<FoodCollectionResponse[]>(
      "/businesscollections/",
    );

    return data.map(FoodCollectionMapper.fromResponse);
  } catch (error) {
    console.log(error);
    throw "No se pudo cargar la colección";
  }
};
