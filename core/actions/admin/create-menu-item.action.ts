import { xiriApi } from "@/core/api/xiri-api";
import { BusinessMenuItemResponse } from "@/infrastructure/interfaces/menu-item-response.interface";
import { MenuItemMapper } from "@/infrastructure/mappers/menu-item.mapper";

interface CreateMenuItemParams {
  name: string;
  description: string;
  business: number;
  traditionalFood?: number | null;
  isTraditionalVariant: boolean;
  image?: { uri: string; name: string; type: string };
}

export const createMenuItemAction = async (params: CreateMenuItemParams) => {
  try {
    const formData = new FormData();
    formData.append("name", params.name);
    formData.append("description", params.description);
    formData.append("business", params.business.toString());
    formData.append("is_traditional_variant", params.isTraditionalVariant.toString());

    if (params.traditionalFood) {
      formData.append("traditional_food", params.traditionalFood.toString());
    }

    if (params.image) {
      formData.append("image", {
        uri: params.image.uri,
        name: params.image.name,
        type: params.image.type,
      } as any);
    }

    const { data } = await xiriApi.post<BusinessMenuItemResponse>(
      "/businessmenu-items/",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    return MenuItemMapper.fromResponse(data);
  } catch (error) {
    console.log(error);
    throw "No se pudo crear el platillo";
  }
};
