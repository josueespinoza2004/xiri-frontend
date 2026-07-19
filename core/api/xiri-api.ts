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

// Interceptor de response: si recibe 401/403, limpia tokens y redirige al login
xiriApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      await SecureStorage.removeTokens();
      router.replace("/(auth)/login");
    }

    return Promise.reject(error);
  },
);
