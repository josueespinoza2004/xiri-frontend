import { xiriApi } from "@/core/api/xiri-api";
import { BusinessResponse } from "@/infrastructure/interfaces/business-response.interface";
import { BusinessMapper } from "@/infrastructure/mappers/business.mapper";

export const getMyBusinessesAction = async () => {
  try {
    const { data } = await xiriApi.get<BusinessResponse[]>(
      "/businessbusiness/?owner=me",
    );

    return data.map(BusinessMapper.fromBusinessResponse);
  } catch (error) {
    console.log(error);
    throw "No se pudieron cargar tus negocios";
  }
};
