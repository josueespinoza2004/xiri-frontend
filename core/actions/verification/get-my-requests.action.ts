import { xiriApi } from "@/core/api/xiri-api";
import { VerificationRequestResponse } from "@/infrastructure/interfaces/verification-response.interface";
import { VerificationMapper } from "@/infrastructure/mappers/verification.mapper";

export const getMyRequestsAction = async () => {
  try {
    const { data } = await xiriApi.get<VerificationRequestResponse[]>(
      "/auth/verification-requests/",
    );

    return data.map(VerificationMapper.fromResponse);
  } catch (error) {
    console.log(error);
    throw "No se pudieron cargar las solicitudes";
  }
};
