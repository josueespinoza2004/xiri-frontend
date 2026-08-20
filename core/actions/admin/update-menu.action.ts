import { xiriApi } from "@/core/api/xiri-api";
import { MenuItemResponse } from "@/infrastructure/interfaces/menu-response.interface";
import { MenuMapper } from "@/infrastructure/mappers/menu.mapper";

interface UpdateMenuParams {
  id: number;
  price: string;
}

export const updateMenuAction = async (params: UpdateMenuParams) => {
  try {
    const { data } = await xiriApi.patch<MenuItemResponse>(
      `/businessmenus/${params.id}/`,
      { price: params.price },
    );

    return MenuMapper.fromResponse(data);
  } catch (error) {
    console.log(error);
    throw "No se pudo actualizar el precio";
  }
};
