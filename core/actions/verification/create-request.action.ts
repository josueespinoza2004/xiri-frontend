import { xiriApi } from "@/core/api/xiri-api";
import { VerificationRequestResponse } from "@/infrastructure/interfaces/verification-response.interface";
import { VerificationMapper } from "@/infrastructure/mappers/verification.mapper";

interface CreateRequestParams {
  businessName: string;
  businessAddress: string;
  idCardNumber: string;
  identityDocument: { uri: string; name: string; type: string };
}

export const createRequestAction = async (params: CreateRequestParams) => {
  try {
    const formData = new FormData();
    formData.append("business_name", params.businessName);
    formData.append("business_address", params.businessAddress);
    formData.append("id_card_number", params.idCardNumber);
    formData.append("identity_document", {
      uri: params.identityDocument.uri,
      name: params.identityDocument.name,
      type: params.identityDocument.type,
    } as any);

    const { data } = await xiriApi.post<VerificationRequestResponse>(
      "/auth/verification-requests/",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    return VerificationMapper.fromResponse(data);
  } catch (error: any) {
    console.log(error);
    throw "No se pudo enviar la solicitud";
  }
};
