import { getFoodsByDepartmentAction } from "@/core/actions/gastronomy/get-foods-by-department.action";
import { useQuery } from "@tanstack/react-query";

export const useFoodsByDepartment = (departmentId: number) => {
  const foodsQuery = useQuery({
    queryKey: ["gastronomy", "foods", "department", departmentId],
    queryFn: () => getFoodsByDepartmentAction(departmentId),
    staleTime: 1000 * 60 * 60 * 24,
  });

  return { foodsQuery };
};
