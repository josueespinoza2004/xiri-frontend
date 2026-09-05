import { xiriApi } from "@/core/api/xiri-api";
import { Food } from "@/infrastructure/interfaces/gastronomy.interface";
import { FoodResponse } from "@/infrastructure/interfaces/gastronomy-response.interface";
import { FoodMapper } from "@/infrastructure/mappers/food.mapper";

export const getFoodsAction = async (): Promise<Food[]> => {
  try {
    const { data } = await xiriApi.get<FoodResponse[]>(
      "/gastronomy/foods/",
    );

    const rawList: FoodResponse[] = Array.isArray(data) ? data : ((data as any)?.results ?? []);
    const foods = rawList.map(FoodMapper.fromFoodResponse);

    return foods;
  } catch (error) {
    console.log(error);
    throw "No se pudieron cargar las comidas";
  }
};
