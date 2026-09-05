import { xiriApi } from "@/core/api/xiri-api";
import { Business } from "@/infrastructure/interfaces/business.interface";
import { BusinessResponse } from "@/infrastructure/interfaces/business-response.interface";
import { BusinessMapper } from "@/infrastructure/mappers/business.mapper";

export const getAllBusinessesAction = async (): Promise<Business[]> => {
  try {
    const { data } = await xiriApi.get<BusinessResponse[]>(
      "/business/business/",
    );

    const rawList: BusinessResponse[] = Array.isArray(data) ? data : ((data as any)?.results ?? []);
    return rawList.map(BusinessMapper.fromBusinessResponse);
  } catch (error) {
    console.log(error);
    throw "No se pudieron cargar los negocios";
  }
};
