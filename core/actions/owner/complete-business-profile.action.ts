import { xiriApi } from "@/core/api/xiri-api";
import { BusinessResponse } from "@/infrastructure/interfaces/business-response.interface";
import { BusinessMapper } from "@/infrastructure/mappers/business.mapper";

interface CompleteProfileParams {
  id: number;
  contact_number?: string;
  latitude?: string;
  longitude?: string;
}

export const completeBusinessProfileAction = async (params: CompleteProfileParams) => {
  try {
    const { id, ...body } = params;
    const { data } = await xiriApi.patch<{ data: BusinessResponse }>(
      `/business/business/${id}/complete_profile/`,
      body,
    );

    return BusinessMapper.fromBusinessResponse(data.data);
  } catch (error) {
    console.log(error);
    throw "No se pudo actualizar el perfil del negocio";
  }
};
