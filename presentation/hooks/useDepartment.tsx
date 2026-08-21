import { getDepartmentsAction } from "@/core/actions/gastronomy/get-departments.action";
import { useQuery } from "@tanstack/react-query";

export const useDepartment = (id: number) => {
  const departmentQuery = useQuery({
    queryKey: ["gastronomy", "department", id],
    queryFn: async () => {
      const departments = await getDepartmentsAction();
      return departments.find((d) => d.id === id) ?? null;
    },
    staleTime: 1000 * 60 * 60 * 24,
  });

  return { departmentQuery };
};
