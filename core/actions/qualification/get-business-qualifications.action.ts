import { xiriApi } from "@/core/api/xiri-api";
import { QualificationResponse } from "@/infrastructure/interfaces/qualification-response.interface";
import { QualificationMapper } from "@/infrastructure/mappers/qualification.mapper";

export const getBusinessQualificationsAction = async (businessId: number) => {
  try {
    const { data } = await xiriApi.get<QualificationResponse[]>(
      `/businessqualifications/?business=${businessId}`,
    );

    return data.map(QualificationMapper.fromResponse);
  } catch (error) {
    console.log(error);
    throw "No se pudieron cargar las reseñas";
  }
};
