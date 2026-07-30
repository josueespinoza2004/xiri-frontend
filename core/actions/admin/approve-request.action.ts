import { xiriApi } from "@/core/api/xiri-api";

export const approveRequestAction = async (requestId: number) => {
  try {
    const { data } = await xiriApi.post(
      `/auth/verification-requests/${requestId}/approve/`,
    );

    return data;
  } catch (error) {
    console.log(error);
    throw "No se pudo aprobar la solicitud";
  }
};
