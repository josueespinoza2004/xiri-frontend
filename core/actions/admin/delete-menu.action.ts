import { xiriApi } from "@/core/api/xiri-api";

export const deleteMenuAction = async (id: number) => {
  try {
    await xiriApi.delete(`/business/menus/${id}/`);
  } catch (error) {
    console.log(error);
    throw "No se pudo eliminar el menú";
  }
};
