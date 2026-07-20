import { xiriApi } from "@/core/api/xiri-api";
import { GastronomicRouteResponse } from "@/infrastructure/interfaces/route-response.interface";
import { RouteMapper } from "@/infrastructure/mappers/route.mapper";

export const getRoutesAction = async () => {
  try {
    const { data } = await xiriApi.get<GastronomicRouteResponse[]>(
      "/gastronomyroutes/",
    );

    return data.map(RouteMapper.fromRouteResponse);
  } catch (error) {
    console.log(error);
    throw "No se pudieron cargar las rutas";
  }
};
