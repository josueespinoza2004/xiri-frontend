import { xiriApi } from "@/core/api/xiri-api";

export const deleteMenuItemAction = async (id: number) => {
  try {
    await xiriApi.delete(`/businessmenu-items/${id}/`);
  } catch (error) {
    console.log(error);
    throw "No se pudo eliminar el platillo";
  }
};
