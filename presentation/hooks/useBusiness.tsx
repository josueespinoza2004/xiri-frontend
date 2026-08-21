import { getAllBusinessesAction } from "@/core/actions/admin/get-all-businesses.action";
import { useQuery } from "@tanstack/react-query";

export const useBusiness = (id: number) => {
  const businessQuery = useQuery({
    queryKey: ["businesses", "detail", id],
    queryFn: async () => {
      const businesses = await getAllBusinessesAction();
      return businesses.find((b) => b.id === id) ?? null;
    },
    staleTime: 1000 * 60 * 60,
  });

  return { businessQuery };
};
