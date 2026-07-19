import { create } from "axios";
import { SecureStorage } from "@/config/helpers/secure-storage";
import { router } from "expo-router";

export const xiriApi = create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

// Interceptor de request: adjunta el token a cada petición
xiriApi.interceptors.request.use(async (config) => {
  const token = await SecureStorage.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptor de response: si recibe 401 (token inválido), limpia sesión
xiriApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";

    const isAuthEndpoint =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/register");

    if (status === 401 && !isAuthEndpoint) {
      await SecureStorage.removeTokens();
      router.replace("/(auth)/login");
    }

    return Promise.reject(error);
  },
);
