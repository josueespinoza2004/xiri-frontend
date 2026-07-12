import { xiriApi } from "@/core/api/xiri-api";
import {
  RegisterRequest,
  RegisterResponse,
} from "@/infrastructure/interfaces/auth.interface";

export const registerAction = async (
  userData: RegisterRequest,
): Promise<RegisterResponse> => {
  try {
    const { data } = await xiriApi.post<RegisterResponse>(
      "/auth/register/",
      userData,
    );

    return data;
  } catch (error: any) {
    console.log(error);
    throw error.response?.data || "No se pudo registrar el usuario";
  }
};
