import { getMenuByBusinessAction } from "@/core/actions/menu/get-menu-by-business.action";
import { createMenuAction } from "@/core/actions/admin/create-menu.action";
import { deleteMenuAction } from "@/core/actions/admin/delete-menu.action";
import { getAllBusinessesAction } from "@/core/actions/admin/get-all-businesses.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface CreateMenuParams {
  business: number;
  menuItem: number;
  price: string;
}

export const useAdminMenus = (selectedBusinessId?: number) => {
  const queryClient = useQueryClient();

  const businessesQuery = useQuery({
    queryKey: ["admin", "businesses"],
    queryFn: getAllBusinessesAction,
    staleTime: 1000 * 60 * 5,
  });

  const menuQuery = useQuery({
    queryKey: ["menu", selectedBusinessId],
    queryFn: () => getMenuByBusinessAction(selectedBusinessId!),
    enabled: !!selectedBusinessId,
    staleTime: 1000 * 60 * 5,
  });

  const createMutation = useMutation({
    mutationFn: (params: CreateMenuParams) => createMenuAction(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteMenuAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu"] });
    },
  });

  return {
    businessesQuery,
    menuQuery,
    createMutation,
    deleteMutation,
  };
};
