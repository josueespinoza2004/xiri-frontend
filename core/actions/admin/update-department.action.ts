import { xiriApi } from "@/core/api/xiri-api";
import { DepartmentResponse } from "@/infrastructure/interfaces/gastronomy-response.interface";
import { DepartmentMapper } from "@/infrastructure/mappers/department.mapper";

interface UpdateDepartmentParams {
  id: number;
  name: string;
  description: string;
  latitude: string;
  longitude: string;
}

export const updateDepartmentAction = async (params: UpdateDepartmentParams) => {
  try {
    const { data } = await xiriApi.patch<DepartmentResponse>(
      `/gastronomydepartments/${params.id}/`,
      {
        name: params.name,
        description: params.description,
        latitude: params.latitude,
        longitude: params.longitude,
      },
    );

    return DepartmentMapper.fromDepartmentResponse(data);
  } catch (error) {
    console.log(error);
    throw "No se pudo actualizar el departamento";
  }
};
