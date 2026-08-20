import { xiriApi } from "@/core/api/xiri-api";
import { RouteBusinessResponse } from "@/infrastructure/interfaces/route-response.interface";
import { RouteMapper } from "@/infrastructure/mappers/route.mapper";

interface UpdateRouteBusinessParams {
  id: number;
  suggestedOrder: number;
}

export const updateRouteBusinessAction = async (params: UpdateRouteBusinessParams) => {
  try {
    const { data } = await xiriApi.patch<RouteBusinessResponse>(
      `/businessroute-business/${params.id}/`,
      { suggested_order: params.suggestedOrder },
    );

    return RouteMapper.fromRouteBusinessResponse(data);
  } catch (error) {
    console.log(error);
    throw "No se pudo actualizar el orden";
  }
};
