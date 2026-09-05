import { getBusinessesByFoodAction } from "@/core/actions/business/get-businesses-by-food.action";
import { useQuery } from "@tanstack/react-query";

export const useBusinessesByFood = (foodId: number) => {
  const businessesQuery = useQuery({
    queryKey: ["businesses", "by-food", foodId],
    queryFn: () => getBusinessesByFoodAction(foodId),
    staleTime: 1000 * 60 * 60,
  });

  return { businessesQuery };
};

