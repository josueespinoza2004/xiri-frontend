import { xiriApi } from "@/core/api/xiri-api";
import { BusinessResponse } from "@/infrastructure/interfaces/business-response.interface";
import { BusinessMapper } from "@/infrastructure/mappers/business.mapper";

export const getAllBusinessesAction = async () => {
  try {
    const { data } = await xiriApi.get<BusinessResponse[]>(
      "/businessbusiness/",
    );

    return data.map(BusinessMapper.fromBusinessResponse);
  } catch (error) {
    console.log(error);
    throw "No se pudieron cargar los negocios";
  }
};
