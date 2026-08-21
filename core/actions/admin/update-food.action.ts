import { xiriApi } from "@/core/api/xiri-api";
import { FoodResponse } from "@/infrastructure/interfaces/gastronomy-response.interface";
import { FoodMapper } from "@/infrastructure/mappers/food.mapper";

interface UpdateFoodParams {
  id: number;
  name: string;
  description: string;
  culturalOrigin: string;
  departmentOrigin: number;
  image?: { uri: string; name: string; type: string };
}

export const updateFoodAction = async (params: UpdateFoodParams) => {
  try {
    const formData = new FormData();
    formData.append("name", params.name);
    formData.append("description", params.description);
    formData.append("cultural_origin", params.culturalOrigin);
    formData.append("department_origin", params.departmentOrigin.toString());

    if (params.image) {
      formData.append("image", {
        uri: params.image.uri,
        name: params.image.name,
        type: params.image.type,
      } as any);
    }

    const { data } = await xiriApi.patch<FoodResponse>(
      `/gastronomyfoods/${params.id}/`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    return FoodMapper.fromFoodResponse(data);
  } catch (error) {
    console.log(error);
    throw "No se pudo actualizar la comida";
  }
};
