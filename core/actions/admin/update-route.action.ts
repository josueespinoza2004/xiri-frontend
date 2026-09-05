import { xiriApi } from "@/core/api/xiri-api";
import { GastronomicRouteResponse } from "@/infrastructure/interfaces/route-response.interface";
import { RouteMapper } from "@/infrastructure/mappers/route.mapper";

interface UpdateRouteParams {
  id: number;
  name: string;
  description: string;
  department: number;
}

export const updateRouteAction = async (params: UpdateRouteParams) => {
  try {
    const { data } = await xiriApi.patch<GastronomicRouteResponse>(
      `/gastronomy/routes/${params.id}/`,
      {
        name: params.name,
        description: params.description,
        department: params.department,
      },
    );

    return RouteMapper.fromRouteResponse(data);
  } catch (error) {
    console.log(error);
    throw "No se pudo actualizar la ruta";
  }
};
