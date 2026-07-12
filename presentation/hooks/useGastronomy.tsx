import { getFoodsAction } from "@/core/actions/gastronomy/get-foods.action";
import { getDepartmentsAction } from "@/core/actions/gastronomy/get-departments.action";
import { useQuery } from "@tanstack/react-query";

export const useGastronomy = () => {
  const foodsQuery = useQuery({
    queryKey: ["gastronomy", "foods"],
    queryFn: getFoodsAction,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const departmentsQuery = useQuery({
    queryKey: ["gastronomy", "departments"],
    queryFn: getDepartmentsAction,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return {
    foodsQuery,
    departmentsQuery,
  };
};
