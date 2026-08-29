import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const SEEN_BADGES_KEY = "seen_badges";

export class SecureStorage {
  static async setTokens(access: string, refresh: string): Promise<void> {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refresh);
  }

  static async getAccessToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  }

  static async getRefreshToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  }

  static async removeTokens(): Promise<void> {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  }

  static async getSeenBadges(): Promise<string[]> {
    const raw = await SecureStore.getItemAsync(SEEN_BADGES_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  static async setSeenBadges(badgeIds: string[]): Promise<void> {
    await SecureStore.setItemAsync(SEEN_BADGES_KEY, JSON.stringify(badgeIds));
  }
}
