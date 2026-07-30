import { xiriApi } from "@/core/api/xiri-api";
import { GastronomicRouteResponse } from "@/infrastructure/interfaces/route-response.interface";
import { RouteMapper } from "@/infrastructure/mappers/route.mapper";

interface CreateRouteParams {
  name: string;
  description: string;
  department: number;
}

export const createRouteAction = async (params: CreateRouteParams) => {
  try {
    const { data } = await xiriApi.post<GastronomicRouteResponse>(
      "/gastronomyroutes/",
      params,
    );

    return RouteMapper.fromRouteResponse(data);
  } catch (error) {
    console.log(error);
    throw "No se pudo crear la ruta";
  }
};
