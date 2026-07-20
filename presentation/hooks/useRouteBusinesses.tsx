import { getRouteBusinessesAction } from "@/core/actions/routes/get-route-businesses.action";
import { useQuery } from "@tanstack/react-query";

export const useRouteBusinesses = (routeId: number) => {
  const routeBusinessesQuery = useQuery({
    queryKey: ["routes", "businesses", routeId],
    queryFn: () => getRouteBusinessesAction(routeId),
    staleTime: 1000 * 60 * 60,
  });

  return { routeBusinessesQuery };
};
