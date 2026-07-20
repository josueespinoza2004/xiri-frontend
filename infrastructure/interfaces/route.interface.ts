export interface GastronomicRoute {
  id: number;
  name: string;
  description: string;
  department: number;
}

export interface RouteBusiness {
  id: number;
  route: number;
  routeName: string;
  business: number;
  businessName: string;
  businessAddress: string;
  suggestedOrder: number;
}
