import { xiriApi } from "@/core/api/xiri-api";

export const removeFromCollectionAction = async (itemId: number) => {
  try {
    await xiriApi.delete(`/businesscollections/${itemId}/`);
  } catch (error) {
    console.log(error);
    throw "No se pudo eliminar de la colección";
  }
};
