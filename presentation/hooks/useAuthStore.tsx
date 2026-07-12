import { useEffect, useState } from "react";
import { SecureStorage } from "@/config/helpers/secure-storage";
import { AuthState } from "@/infrastructure/interfaces/auth-state.interface";

export const useAuthStore = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    isLoading: true,
  });

  // Al montar, revisa si hay tokens guardados
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const accessToken = await SecureStorage.getAccessToken();
    const refreshToken = await SecureStorage.getRefreshToken();

    setAuthState({
      isAuthenticated: !!accessToken,
      accessToken,
      refreshToken,
      isLoading: false,
    });
  };

  const login = async (access: string, refresh: string) => {
    await SecureStorage.setTokens(access, refresh);
    setAuthState({
      isAuthenticated: true,
      accessToken: access,
      refreshToken: refresh,
      isLoading: false,
    });
  };

  const logout = async () => {
    await SecureStorage.removeTokens();
    setAuthState({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
    });
  };

  return {
    authState,
    login,
    logout,
  };
};
