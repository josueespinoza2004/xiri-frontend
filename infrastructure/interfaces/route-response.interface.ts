export interface GastronomicRouteResponse {
  id: number;
  name: string;
  description: string;
  department: number;
}

export interface RouteBusinessResponse {
  id: number;
  route: number;
  route_name: string;
  business: number;
  business_name: string;
  business_address: string;
  suggested_order: number;
}
