import { xiriApi } from "@/core/api/xiri-api";
import { FoodResponse } from "@/infrastructure/interfaces/gastronomy-response.interface";
import { FoodMapper } from "@/infrastructure/mappers/food.mapper";

export const getFoodsAction = async () => {
  try {
    const { data } = await xiriApi.get<FoodResponse[]>(
      "/gastronomyfoods/",
    );

    const foods = data.map(FoodMapper.fromFoodResponse);

    return foods;
  } catch (error) {
    console.log(error);
    throw "No se pudieron cargar las comidas";
  }
};
