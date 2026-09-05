import { xiriApi } from "@/core/api/xiri-api";
import { GastronomicRoute } from "@/infrastructure/interfaces/route.interface";
import { GastronomicRouteResponse } from "@/infrastructure/interfaces/route-response.interface";
import { RouteMapper } from "@/infrastructure/mappers/route.mapper";

export const getRoutesAction = async (): Promise<GastronomicRoute[]> => {
  try {
    const { data } = await xiriApi.get<GastronomicRouteResponse[]>(
      "/gastronomy/routes/",
    );

    const rawList: GastronomicRouteResponse[] = Array.isArray(data) ? data : ((data as any)?.results ?? []);
    return rawList.map(RouteMapper.fromRouteResponse);
  } catch (error) {
    console.log(error);
    throw "No se pudieron cargar las rutas";
  }
};
