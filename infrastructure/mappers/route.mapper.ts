import { GastronomicRoute, RouteBusiness } from "../interfaces/route.interface";
import {
  GastronomicRouteResponse,
  RouteBusinessResponse,
} from "../interfaces/route-response.interface";

export class RouteMapper {
  static fromRouteResponse = (route: GastronomicRouteResponse): GastronomicRoute => {
    return {
      id: route.id,
      name: route.name,
      description: route.description,
      department: route.department,
      departmentName: route.department_name,
    };
  };

  static fromRouteBusinessResponse = (item: RouteBusinessResponse): RouteBusiness => {
    return {
      id: item.id,
      route: item.route,
      routeName: item.route_name,
      business: item.business,
      businessName: item.business_name,
      businessAddress: item.business_address,
      suggestedOrder: item.suggested_order,
    };
  };
}
