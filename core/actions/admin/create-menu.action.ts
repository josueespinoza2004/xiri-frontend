import { xiriApi } from "@/core/api/xiri-api";
import { MenuItemResponse } from "@/infrastructure/interfaces/menu-response.interface";
import { MenuMapper } from "@/infrastructure/mappers/menu.mapper";

interface CreateMenuParams {
  business: number;
  menuItem: number;
  price: string;
}

export const createMenuAction = async (params: CreateMenuParams) => {
  try {
    const { data } = await xiriApi.post<MenuItemResponse>(
      "/business/menus/",
      {
        business: params.business,
        menu_item: params.menuItem,
        price: params.price,
      },
    );

    return MenuMapper.fromResponse(data);
  } catch (error) {
    console.log(error);
    throw "No se pudo crear el menú";
  }
};
