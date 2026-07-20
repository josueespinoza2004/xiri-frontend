import { xiriApi } from "@/core/api/xiri-api";
import { UserResponse } from "@/infrastructure/interfaces/auth.interface";
import { UserMapper } from "@/infrastructure/mappers/user.mapper";

export const getProfileAction = async () => {
  try {
    const { data } = await xiriApi.get<UserResponse>("/auth/me/");

    return UserMapper.fromUserResponse(data);
  } catch (error) {
    console.log(error);
    throw "No se pudo cargar el perfil";
  }
};
