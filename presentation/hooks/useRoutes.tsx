import { getRoutesAction } from "@/core/actions/routes/get-routes.action";
import { useQuery } from "@tanstack/react-query";

export const useRoutes = () => {
  const routesQuery = useQuery({
    queryKey: ["routes"],
    queryFn: getRoutesAction,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return { routesQuery };
};
