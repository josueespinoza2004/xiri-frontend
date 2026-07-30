import { xiriApi } from "@/core/api/xiri-api";

export const deleteRouteBusinessAction = async (id: number) => {
  try {
    await xiriApi.delete(`/businessroute-business/${id}/`);
  } catch (error) {
    console.log(error);
    throw "No se pudo eliminar el negocio de la ruta";
  }
};
