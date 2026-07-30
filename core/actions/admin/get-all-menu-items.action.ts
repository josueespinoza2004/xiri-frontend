import { xiriApi } from "@/core/api/xiri-api";
import { BusinessMenuItemResponse } from "@/infrastructure/interfaces/menu-item-response.interface";
import { MenuItemMapper } from "@/infrastructure/mappers/menu-item.mapper";

export const getAllMenuItemsAction = async (businessId?: number) => {
  try {
    const url = businessId
      ? `/businessmenu-items/?business=${businessId}`
      : "/businessmenu-items/";

    const { data } = await xiriApi.get<BusinessMenuItemResponse[]>(url);

    return data.map(MenuItemMapper.fromResponse);
  } catch (error) {
    console.log(error);
    throw "No se pudieron cargar los platillos";
  }
};
