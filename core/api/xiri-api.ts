import axios, { create } from "axios";
import { SecureStorage } from "@/config/helpers/secure-storage";
import { router } from "expo-router";

// URL del backend. Usa la variable de entorno si está disponible (dev / Expo Go),
// y cae a la URL pública de producción como respaldo (necesario para el APK de EAS,
// donde la variable EXPO_PUBLIC_* puede no embeberse si el .env no se sube al build).
const API_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  "https://xiri-backend-production.onrender.com/api";

export const xiriApi = create({
  baseURL: API_URL,
  timeout: 60000, // 60s para tolerar el cold-start del backend en Render (plan free)
});

// Interceptor de request: adjunta el token a cada petición
xiriApi.interceptors.request.use(async (config) => {
  const token = await SecureStorage.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptor de response: desenvuelve paginación si viene de DRF y renueva token ante 401
xiriApi.interceptors.response.use(
  (response) => {
    if (
      response.data &&
      typeof response.data === "object" &&
      !Array.isArray(response.data) &&
      Array.isArray(response.data.results)
    ) {
      response.data = response.data.results;
    }
    return response;
  },
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
          `${API_URL}/auth/token/refresh/`,
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
