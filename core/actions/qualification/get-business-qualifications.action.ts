import { xiriApi } from "@/core/api/xiri-api";
import { Qualification } from "@/infrastructure/interfaces/qualification.interface";
import { QualificationResponse } from "@/infrastructure/interfaces/qualification-response.interface";
import { QualificationMapper } from "@/infrastructure/mappers/qualification.mapper";

export const getBusinessQualificationsAction = async (businessId: number): Promise<Qualification[]> => {
  try {
    const { data } = await xiriApi.get<QualificationResponse[]>(
      `/business/qualifications/?business=${businessId}`,
    );

    const rawList: QualificationResponse[] = Array.isArray(data) ? data : ((data as any)?.results ?? []);
    return rawList.map(QualificationMapper.fromResponse);
  } catch (error) {
    console.log(error);
    throw "No se pudieron cargar las reseñas";
  }
};
