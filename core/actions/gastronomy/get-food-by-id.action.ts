import { xiriApi } from "@/core/api/xiri-api";
import { FoodResponse } from "@/infrastructure/interfaces/gastronomy-response.interface";
import { FoodMapper } from "@/infrastructure/mappers/food.mapper";

export const getFoodByIdAction = async (id: number | string) => {
  try {
    const { data } = await xiriApi.get<FoodResponse>(
      `/gastronomyfoods/${id}/`,
    );

    return FoodMapper.fromFoodResponse(data);
  } catch (error) {
    console.log(error);
    throw "No se pudo cargar la comida";
  }
};
