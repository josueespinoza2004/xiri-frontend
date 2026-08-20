import { getAllMenuItemsAction } from "@/core/actions/admin/get-all-menu-items.action";
import { createMenuItemAction } from "@/core/actions/admin/create-menu-item.action";
import { deleteMenuItemAction } from "@/core/actions/admin/delete-menu-item.action";
import { validateForAlbumAction } from "@/core/actions/admin/validate-for-album.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface CreateParams {
  name: string;
  description: string;
  business: number;
  traditionalFood?: number | null;
  isTraditionalVariant: boolean;
  image?: { uri: string; name: string; type: string };
}

interface ValidateParams {
  menuItemId: number;
  traditionalFoodId?: number;
}

export const useAdminMenuItems = (selectedBusinessId?: number) => {
  const queryClient = useQueryClient();

  const menuItemsQuery = useQuery({
    queryKey: ["admin", "menu-items", selectedBusinessId],
    queryFn: () => getAllMenuItemsAction(selectedBusinessId),
    enabled: !!selectedBusinessId,
    staleTime: 1000 * 60 * 5,
  });

  const createMutation = useMutation({
    mutationFn: (params: CreateParams) => createMenuItemAction(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "menu-items"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteMenuItemAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "menu-items"] });
    },
  });

  const validateMutation = useMutation({
    mutationFn: (params: ValidateParams) => validateForAlbumAction(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "menu-items"] });
    },
  });

  return {
    menuItemsQuery,
    createMutation,
    deleteMutation,
    validateMutation,
  };
};
