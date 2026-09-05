import { xiriApi } from "@/core/api/xiri-api";
import { Department } from "@/infrastructure/interfaces/gastronomy.interface";
import { DepartmentResponse } from "@/infrastructure/interfaces/gastronomy-response.interface";
import { DepartmentMapper } from "@/infrastructure/mappers/department.mapper";

export const getDepartmentsAction = async (): Promise<Department[]> => {
  try {
    const { data } = await xiriApi.get<
      DepartmentResponse[] | { results: DepartmentResponse[] }
    >("/gastronomy/departments/");

    const rawList: DepartmentResponse[] = Array.isArray(data)
      ? data
      : data?.results ?? [];
    const departments = rawList.map(DepartmentMapper.fromDepartmentResponse);

    return departments;
  } catch (error) {
    console.log(error);
    throw "No se pudieron cargar los departamentos";
  }
};
