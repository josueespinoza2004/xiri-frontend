import { getRoutesAction } from "@/core/actions/routes/get-routes.action";
import { useQuery } from "@tanstack/react-query";

export const useRoute = (id: number) => {
  const routeQuery = useQuery({
    queryKey: ["routes", "detail", id],
    queryFn: async () => {
      const routes = await getRoutesAction();
      return routes.find((r) => r.id === id) ?? null;
    },
    staleTime: 1000 * 60 * 60 * 24,
  });

  return { routeQuery };
};
