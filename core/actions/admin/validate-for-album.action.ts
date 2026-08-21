import { xiriApi } from "@/core/api/xiri-api";

interface ValidateForAlbumParams {
  menuItemId: number;
  traditionalFoodId?: number;
}

export const validateForAlbumAction = async (params: ValidateForAlbumParams) => {
  try {
    const body: Record<string, any> = {};

    if (params.traditionalFoodId) {
      body.traditional_food = params.traditionalFoodId;
    }

    const { data } = await xiriApi.patch(
      `/businessmenu-items/${params.menuItemId}/validate_for_album/`,
      body,
    );

    return data;
  } catch (error) {
    console.log(error);
    throw "No se pudo validar el platillo para el álbum";
  }
};
