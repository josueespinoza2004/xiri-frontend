import { xiriApi } from "@/core/api/xiri-api";
import { BusinessMenuItem } from "@/infrastructure/interfaces/menu-item.interface";
import { BusinessMenuItemResponse } from "@/infrastructure/interfaces/menu-item-response.interface";
import { MenuItemMapper } from "@/infrastructure/mappers/menu-item.mapper";

export const getAllMenuItemsAction = async (businessId?: number): Promise<BusinessMenuItem[]> => {
  try {
    const url = businessId
      ? `/business/menu-items/?business=${businessId}`
      : "/business/menu-items/";

    const { data } = await xiriApi.get<BusinessMenuItemResponse[]>(url);

    const rawList: BusinessMenuItemResponse[] = Array.isArray(data) ? data : ((data as any)?.results ?? []);
    return rawList.map(MenuItemMapper.fromResponse);
  } catch (error) {
    console.log(error);
    throw "No se pudieron cargar los platillos";
  }
};
