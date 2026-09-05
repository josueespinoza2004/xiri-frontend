import { xiriApi } from "@/core/api/xiri-api";

export const deleteDepartmentAction = async (id: number) => {
  try {
    await xiriApi.delete(`/gastronomy/departments/${id}/`);
  } catch (error) {
    console.log(error);
    throw "No se pudo eliminar el departamento";
  }
};
