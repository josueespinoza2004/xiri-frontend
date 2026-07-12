import { xiriApi } from "@/core/api/xiri-api";
import { DepartmentResponse } from "@/infrastructure/interfaces/gastronomy-response.interface";
import { DepartmentMapper } from "@/infrastructure/mappers/department.mapper";

export const getDepartmentsAction = async () => {
  try {
    const { data } = await xiriApi.get<DepartmentResponse[]>(
      "/gastronomydepartments/",
    );

    const departments = data.map(DepartmentMapper.fromDepartmentResponse);

    return departments;
  } catch (error) {
    console.log(error);
    throw "No se pudieron cargar los departamentos";
  }
};
