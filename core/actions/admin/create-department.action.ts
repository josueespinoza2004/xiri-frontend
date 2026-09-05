import { xiriApi } from "@/core/api/xiri-api";
import { DepartmentResponse } from "@/infrastructure/interfaces/gastronomy-response.interface";
import { DepartmentMapper } from "@/infrastructure/mappers/department.mapper";

interface CreateDepartmentParams {
  name: string;
  description: string;
  latitude: string;
  longitude: string;
}

export const createDepartmentAction = async (params: CreateDepartmentParams) => {
  try {
    const { data } = await xiriApi.post<DepartmentResponse>(
      "/gastronomy/departments/",
      params,
    );

    return DepartmentMapper.fromDepartmentResponse(data);
  } catch (error) {
    console.log(error);
    throw "No se pudo crear el departamento";
  }
};
