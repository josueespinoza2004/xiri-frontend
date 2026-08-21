import { xiriApi } from "@/core/api/xiri-api";

export const deleteBusinessAction = async (id: number) => {
  try {
    await xiriApi.delete(`/businessbusiness/${id}/`);
  } catch (error) {
    console.log(error);
    throw "No se pudo eliminar el negocio";
  }
};
