import { getAllBusinessesAction } from "@/core/actions/admin/get-all-businesses.action";
import { updateBusinessAction } from "@/core/actions/admin/update-business.action";
import { deleteBusinessAction } from "@/core/actions/admin/delete-business.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UpdateParams {
  id: number;
  name?: string;
  address?: string;
  contact_number?: string;
  latitude?: string;
  longitude?: string;
}

export const useAdminBusinesses = () => {
  const queryClient = useQueryClient();

  const businessesQuery = useQuery({
    queryKey: ["admin", "businesses"],
    queryFn: getAllBusinessesAction,
    staleTime: 1000 * 60 * 5,
  });

  const updateMutation = useMutation({
    mutationFn: (params: UpdateParams) => updateBusinessAction(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "businesses"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteBusinessAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "businesses"] });
    },
  });

  return {
    businessesQuery,
    updateMutation,
    deleteMutation,
  };
};
