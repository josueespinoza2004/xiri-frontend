import { xiriApi } from "@/core/api/xiri-api";
import { VerificationRequest } from "@/infrastructure/interfaces/verification.interface";
import { VerificationRequestResponse } from "@/infrastructure/interfaces/verification-response.interface";
import { VerificationMapper } from "@/infrastructure/mappers/verification.mapper";

export const getMyRequestsAction = async (): Promise<VerificationRequest[]> => {
  try {
    const { data } = await xiriApi.get<VerificationRequestResponse[]>(
      "/auth/verification-requests/",
    );

    const rawList: VerificationRequestResponse[] = Array.isArray(data) ? data : ((data as any)?.results ?? []);
    return rawList.map(VerificationMapper.fromResponse);
  } catch (error) {
    console.log(error);
    throw "No se pudieron cargar las solicitudes";
  }
};
