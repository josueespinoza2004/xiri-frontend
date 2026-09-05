import { xiriApi } from "@/core/api/xiri-api";
import { BusinessMenuItemResponse } from "@/infrastructure/interfaces/menu-item-response.interface";
import { MenuItemMapper } from "@/infrastructure/mappers/menu-item.mapper";

interface UpdateMenuItemParams {
  id: number;
  name: string;
  description: string;
  price?: number | string;
  image?: { uri: string; name: string; type: string };
}

export const updateMenuItemAction = async (params: UpdateMenuItemParams) => {
  try {
    const formData = new FormData();
    formData.append("name", params.name);
    formData.append("description", params.description);
    if (params.price !== undefined) {
      formData.append("price", params.price.toString());
    }

    if (params.image) {
      formData.append("image", {
        uri: params.image.uri,
        name: params.image.name,
        type: params.image.type,
      } as any);
    }

    const { data } = await xiriApi.patch<BusinessMenuItemResponse>(
      `/business/menu-items/${params.id}/`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    return MenuItemMapper.fromResponse(data);
  } catch (error) {
    console.log(error);
    throw "No se pudo actualizar el platillo";
  }
};
