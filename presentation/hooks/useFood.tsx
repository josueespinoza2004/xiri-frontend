import { getFoodByIdAction } from "@/core/actions/gastronomy/get-food-by-id.action";
import { useQuery } from "@tanstack/react-query";

export const useFood = (id: number) => {
  const foodQuery = useQuery({
    queryKey: ["gastronomy", "food", id],
    queryFn: () => getFoodByIdAction(id),
    staleTime: 1000 * 60 * 60 * 24,
  });

  return { foodQuery };
};
