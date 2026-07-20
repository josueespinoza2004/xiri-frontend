import { xiriApi } from "@/core/api/xiri-api";
import { RouteBusinessResponse } from "@/infrastructure/interfaces/route-response.interface";
import { RouteMapper } from "@/infrastructure/mappers/route.mapper";

export const getRouteBusinessesAction = async (routeId: number) => {
  try {
    const { data } = await xiriApi.get<RouteBusinessResponse[]>(
      `/businessroute-business/?route=${routeId}`,
    );

    return data.map(RouteMapper.fromRouteBusinessResponse);
  } catch (error) {
    console.log(error);
    throw "No se pudieron cargar los negocios de la ruta";
  }
};
