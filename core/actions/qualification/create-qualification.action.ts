import { xiriApi } from "@/core/api/xiri-api";
import { QualificationResponse } from "@/infrastructure/interfaces/qualification-response.interface";
import { QualificationMapper } from "@/infrastructure/mappers/qualification.mapper";

interface CreateQualificationParams {
  businessId: number;
  qualification: number;
  comment?: string;
  evidenceImage: { uri: string; name: string; type: string };
}

export const createQualificationAction = async (
  params: CreateQualificationParams,
) => {
  try {
    const formData = new FormData();
    formData.append("business", params.businessId.toString());
    formData.append("qualification", params.qualification.toString());

    if (params.comment) {
      formData.append("comment", params.comment);
    }

    formData.append("evidence_image", {
      uri: params.evidenceImage.uri,
      name: params.evidenceImage.name,
      type: params.evidenceImage.type,
    } as any);

    const { data } = await xiriApi.post<QualificationResponse>(
      "/business/qualifications/",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    return QualificationMapper.fromResponse(data);
  } catch (error: any) {
    console.log(error);
    const data = error.response?.data;
    if (data?.business) {
      throw Array.isArray(data.business) ? data.business[0] : data.business;
    }
    if (data?.detail) {
      throw data.detail;
    }
    throw "No se pudo enviar la calificación";
  }
};
