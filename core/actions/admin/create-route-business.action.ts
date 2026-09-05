import { xiriApi } from "@/core/api/xiri-api";
import { RouteBusinessResponse } from "@/infrastructure/interfaces/route-response.interface";
import { RouteMapper } from "@/infrastructure/mappers/route.mapper";

interface CreateRouteBusinessParams {
  route: number;
  business: number;
  suggestedOrder: number;
}

export const createRouteBusinessAction = async (params: CreateRouteBusinessParams) => {
  try {
    const { data } = await xiriApi.post<RouteBusinessResponse>(
      "/business/route-business/",
      {
        route: params.route,
        business: params.business,
        suggested_order: params.suggestedOrder,
      },
    );

    return RouteMapper.fromRouteBusinessResponse(data);
  } catch (error) {
    console.log(error);
    throw "No se pudo asignar el negocio a la ruta";
  }
};
