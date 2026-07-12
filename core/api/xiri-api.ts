import { create } from "axios";

export const xiriApi = create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});
