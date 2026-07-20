import { xiriApi } from "@/core/api/xiri-api";
import { MenuItemResponse } from "@/infrastructure/interfaces/menu-response.interface";
import { MenuMapper } from "@/infrastructure/mappers/menu.mapper";

export const getMenuByBusinessAction = async (businessId: number) => {
  try {
    const { data } = await xiriApi.get<MenuItemResponse[]>(
      `/businessmenus/?business=${businessId}`,
    );

    return data.map(MenuMapper.fromResponse);
  } catch (error) {
    console.log(error);
    throw "No se pudo cargar el menú";
  }
};
