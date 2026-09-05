import { xiriApi } from "@/core/api/xiri-api";
import { Business } from "@/infrastructure/interfaces/business.interface";
import { BusinessResponse } from "@/infrastructure/interfaces/business-response.interface";
import { BusinessMapper } from "@/infrastructure/mappers/business.mapper";

export const getBusinessesByFoodAction = async (
  foodId: number,
): Promise<Business[]> => {
  try {
    const { data } = await xiriApi.get<BusinessResponse[]>(
      `/business/business/?traditional_food=${foodId}`,
    );

    const rawList: BusinessResponse[] = Array.isArray(data)
      ? data
      : ((data as any)?.results ?? []);
    return rawList.map(BusinessMapper.fromBusinessResponse);
  } catch (error) {
    console.log(error);
    throw "No se pudieron cargar los negocios para este platillo";
  }
};

