import { xiriApi } from "@/core/api/xiri-api";
import { FoodCollection } from "@/infrastructure/interfaces/food-collection.interface";
import { FoodCollectionResponse } from "@/infrastructure/interfaces/food-collection-response.interface";
import { FoodCollectionMapper } from "@/infrastructure/mappers/food-collection.mapper";

export const getCollectionAction = async (): Promise<FoodCollection[]> => {
  try {
    const { data } = await xiriApi.get<FoodCollectionResponse[]>(
      "/gastronomy/collections/",
    );

    const rawList: FoodCollectionResponse[] = Array.isArray(data) ? data : ((data as any)?.results ?? []);
    return rawList.map(FoodCollectionMapper.fromResponse);
  } catch (error) {
    console.log(error);
    throw "No se pudo cargar la colección";
  }
};
