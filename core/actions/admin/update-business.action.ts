import { xiriApi } from "@/core/api/xiri-api";
import { BusinessResponse } from "@/infrastructure/interfaces/business-response.interface";
import { BusinessMapper } from "@/infrastructure/mappers/business.mapper";

interface UpdateBusinessParams {
  id: number;
  name?: string;
  address?: string;
  contact_number?: string;
  latitude?: string;
  longitude?: string;
}

export const updateBusinessAction = async (params: UpdateBusinessParams) => {
  try {
    const { id, ...body } = params;
    const { data } = await xiriApi.patch<BusinessResponse>(
      `/businessbusiness/${id}/`,
      body,
    );

    return BusinessMapper.fromBusinessResponse(data);
  } catch (error) {
    console.log(error);
    throw "No se pudo actualizar el negocio";
  }
};
