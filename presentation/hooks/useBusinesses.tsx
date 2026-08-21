import { getAllBusinessesAction } from "@/core/actions/admin/get-all-businesses.action";
import { useQuery } from "@tanstack/react-query";

export const useBusinesses = () => {
  const businessesQuery = useQuery({
    queryKey: ["businesses"],
    queryFn: getAllBusinessesAction,
    staleTime: 1000 * 60 * 60,
  });

  return { businessesQuery };
};
