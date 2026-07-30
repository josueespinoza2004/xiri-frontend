import { xiriApi } from "@/core/api/xiri-api";

export const deleteRouteAction = async (id: number) => {
  try {
    await xiriApi.delete(`/gastronomyroutes/${id}/`);
  } catch (error) {
    console.log(error);
    throw "No se pudo eliminar la ruta";
  }
};
