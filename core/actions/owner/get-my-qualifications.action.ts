import { xiriApi } from "@/core/api/xiri-api";
import { Qualification } from "@/infrastructure/interfaces/qualification.interface";
import { QualificationResponse } from "@/infrastructure/interfaces/qualification-response.interface";
import { QualificationMapper } from "@/infrastructure/mappers/qualification.mapper";

export const getMyQualificationsAction = async (): Promise<Qualification[]> => {
  try {
    // Sin filtro ?business= el backend devuelve las calificaciones
    // de los negocios del owner (o las propias del user)
    const { data } = await xiriApi.get<QualificationResponse[]>(
      "/business/qualifications/",
    );

    const rawList: QualificationResponse[] = Array.isArray(data) ? data : ((data as any)?.results ?? []);
    return rawList.map(QualificationMapper.fromResponse);
  } catch (error) {
    console.log(error);
    throw "No se pudieron cargar las calificaciones";
  }
};
