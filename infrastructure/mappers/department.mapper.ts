import { Department } from "../interfaces/gastronomy.interface";
import { DepartmentResponse } from "../interfaces/gastronomy-response.interface";

export class DepartmentMapper {
  static fromDepartmentResponse = (dept: DepartmentResponse): Department => {
    return {
      id: dept.id,
      name: dept.name,
      description: dept.description,
      latitude: parseFloat(dept.latitude),
      longitude: parseFloat(dept.longitude),
    };
  };
}
