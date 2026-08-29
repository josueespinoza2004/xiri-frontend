import { xiriApi } from "@/core/api/xiri-api";
import { BusinessResponse } from "@/infrastructure/interfaces/business-response.interface";
import { BusinessMapper } from "@/infrastructure/mappers/business.mapper";

interface CreateBusinessParams {
  name: string;
  address: string;
  contact_number: string;
  latitude?: string;
  longitude?: string;
}

export const createBusinessAction = async (params: CreateBusinessParams) => {
  try {
    const { data } = await xiriApi.post<BusinessResponse>(
      "/businessbusiness/",
      params,
    );

    return BusinessMapper.fromBusinessResponse(data);
  } catch (error) {
    console.log(error);
    throw "No se pudo crear el negocio";
  }
};
