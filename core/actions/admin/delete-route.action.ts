import { xiriApi } from "@/core/api/xiri-api";

export const deleteRouteAction = async (id: number) => {
  try {
    await xiriApi.delete(`/gastronomy/routes/${id}/`);
  } catch (error) {
    console.log(error);
    throw "No se pudo eliminar la ruta";
  }
};
