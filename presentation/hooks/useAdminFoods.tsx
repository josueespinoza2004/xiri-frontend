import { getFoodsAction } from "@/core/actions/gastronomy/get-foods.action";
import { createFoodAction } from "@/core/actions/admin/create-food.action";
import { deleteFoodAction } from "@/core/actions/admin/delete-food.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface CreateParams {
  name: string;
  description: string;
  culturalOrigin: string;
  departmentOrigin: number;
  image: { uri: string; name: string; type: string };
}

export const useAdminFoods = () => {
  const queryClient = useQueryClient();

  const foodsQuery = useQuery({
    queryKey: ["gastronomy", "foods"],
    queryFn: getFoodsAction,
    staleTime: 1000 * 60 * 5,
  });

  const createMutation = useMutation({
    mutationFn: (params: CreateParams) => createFoodAction(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gastronomy", "foods"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteFoodAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gastronomy", "foods"] });
    },
  });

  return {
    foodsQuery,
    createMutation,
    deleteMutation,
  };
};
