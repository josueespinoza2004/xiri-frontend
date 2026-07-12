import { xiriApi } from "@/core/api/xiri-api";
import {
  LoginRequest,
  LoginResponse,
} from "@/infrastructure/interfaces/auth.interface";

export const loginAction = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  try {
    const { data } = await xiriApi.post<LoginResponse>(
      "/auth/login/",
      credentials,
    );

    return data;
  } catch (error: any) {
    console.log(error);
    throw error.response?.data || "No se pudo iniciar sesión";
  }
};
