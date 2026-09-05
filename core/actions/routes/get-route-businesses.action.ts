import { xiriApi } from "@/core/api/xiri-api";
import { RouteBusiness } from "@/infrastructure/interfaces/route.interface";
import { RouteBusinessResponse } from "@/infrastructure/interfaces/route-response.interface";
import { RouteMapper } from "@/infrastructure/mappers/route.mapper";

export const getRouteBusinessesAction = async (routeId: number): Promise<RouteBusiness[]> => {
  try {
    const { data } = await xiriApi.get<RouteBusinessResponse[]>(
      `/business/route-business/?route=${routeId}`,
    );

    const rawList: RouteBusinessResponse[] = Array.isArray(data) ? data : ((data as any)?.results ?? []);
    return rawList.map(RouteMapper.fromRouteBusinessResponse);
  } catch (error) {
    console.log(error);
    throw "No se pudieron cargar los negocios de la ruta";
  }
};
