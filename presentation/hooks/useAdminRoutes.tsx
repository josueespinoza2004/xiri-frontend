import { getRoutesAction } from "@/core/actions/routes/get-routes.action";
import { getRouteBusinessesAction } from "@/core/actions/routes/get-route-businesses.action";
import { createRouteAction } from "@/core/actions/admin/create-route.action";
import { deleteRouteAction } from "@/core/actions/admin/delete-route.action";
import { updateRouteAction } from "@/core/actions/admin/update-route.action";
import { createRouteBusinessAction } from "@/core/actions/admin/create-route-business.action";
import { deleteRouteBusinessAction } from "@/core/actions/admin/delete-route-business.action";
import { updateRouteBusinessAction } from "@/core/actions/admin/update-route-business.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface CreateRouteParams {
  name: string;
  description: string;
  department: number;
}

interface UpdateRouteParams {
  id: number;
  name: string;
  description: string;
  department: number;
}

interface CreateRouteBusinessParams {
  route: number;
  business: number;
  suggestedOrder: number;
}

interface UpdateRouteBusinessParams {
  id: number;
  suggestedOrder: number;
}

export const useAdminRoutes = (selectedRouteId?: number) => {
  const queryClient = useQueryClient();

  const routesQuery = useQuery({
    queryKey: ["routes"],
    queryFn: getRoutesAction,
    staleTime: 1000 * 60 * 5,
  });

  const routeBusinessesQuery = useQuery({
    queryKey: ["routes", "businesses", selectedRouteId],
    queryFn: () => getRouteBusinessesAction(selectedRouteId!),
    enabled: !!selectedRouteId,
    staleTime: 1000 * 60 * 5,
  });

  const createRouteMutation = useMutation({
    mutationFn: (params: CreateRouteParams) => createRouteAction(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routes"] });
    },
  });

  const deleteRouteMutation = useMutation({
    mutationFn: (id: number) => deleteRouteAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routes"] });
    },
  });

  const updateRouteMutation = useMutation({
    mutationFn: (params: UpdateRouteParams) => updateRouteAction(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routes"] });
    },
  });

  const addBusinessMutation = useMutation({
    mutationFn: (params: CreateRouteBusinessParams) =>
      createRouteBusinessAction(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routes", "businesses"] });
    },
  });

  const removeBusinessMutation = useMutation({
    mutationFn: (id: number) => deleteRouteBusinessAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routes", "businesses"] });
    },
  });

  const updateBusinessOrderMutation = useMutation({
    mutationFn: (params: UpdateRouteBusinessParams) => updateRouteBusinessAction(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routes", "businesses"] });
    },
  });

  return {
    routesQuery,
    routeBusinessesQuery,
    createRouteMutation,
    updateRouteMutation,
    deleteRouteMutation,
    addBusinessMutation,
    removeBusinessMutation,
    updateBusinessOrderMutation,
  };
};
