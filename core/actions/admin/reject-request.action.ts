import { xiriApi } from "@/core/api/xiri-api";

export const rejectRequestAction = async (
  requestId: number,
  reviews: string,
) => {
  try {
    const { data } = await xiriApi.post(
      `/auth/verification-requests/${requestId}/reject/`,
      { reviews },
    );

    return data;
  } catch (error) {
    console.log(error);
    throw "No se pudo rechazar la solicitud";
  }
};
