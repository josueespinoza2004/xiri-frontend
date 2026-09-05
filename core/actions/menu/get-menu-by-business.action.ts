import { xiriApi } from "@/core/api/xiri-api";
import { MenuItem } from "@/infrastructure/interfaces/menu.interface";
import { MenuItemResponse } from "@/infrastructure/interfaces/menu-response.interface";
import { MenuMapper } from "@/infrastructure/mappers/menu.mapper";

export const getMenuByBusinessAction = async (businessId: number): Promise<MenuItem[]> => {
  try {
    const { data } = await xiriApi.get<MenuItemResponse[]>(
      `/business/menus/?business=${businessId}`,
    );

    const rawList: MenuItemResponse[] = Array.isArray(data) ? data : ((data as any)?.results ?? []);
    return rawList.map(MenuMapper.fromResponse);
  } catch (error) {
    console.log(error);
    throw "No se pudo cargar el menú";
  }
};
