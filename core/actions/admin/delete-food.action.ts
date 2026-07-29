import { xiriApi } from "@/core/api/xiri-api";

export const deleteFoodAction = async (id: number) => {
  try {
    await xiriApi.delete(`/gastronomyfoods/${id}/`);
  } catch (error) {
    console.log(error);
    throw "No se pudo eliminar la comida";
  }
};
