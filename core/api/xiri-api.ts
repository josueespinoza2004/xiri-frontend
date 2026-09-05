import axios, { create } from "axios";
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

// Interceptor de response: renueva token automáticamente ante un 401
xiriApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const requestUrl = originalRequest?.url || "";

    const isAuthEndpoint =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/register") ||
      requestUrl.includes("/auth/token/refresh");

    // Si recibimos 401 y no es petición de autenticación ni un reintento previo
    if (status === 401 && !isAuthEndpoint && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await SecureStorage.getRefreshToken();

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Llamada directa con axios para evitar ciclo infinito de interceptores
        const refreshResponse = await axios.post<{ access: string; refresh?: string }>(
          `${process.env.EXPO_PUBLIC_API_URL}/auth/token/refresh/`,
          { refresh: refreshToken }
        );

        const newAccessToken = refreshResponse.data.access;
        const newRefreshToken = refreshResponse.data.refresh || refreshToken;

        // Actualizamos los tokens en almacenamiento seguro
        await SecureStorage.setTokens(newAccessToken, newRefreshToken);

        // Actualizamos el header y reintentamos la petición original
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return xiriApi(originalRequest);
      } catch (refreshError) {
        // Si el refresh token venció o falló, cerramos sesión
        await SecureStorage.removeTokens();
        router.replace("/(auth)/login");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
