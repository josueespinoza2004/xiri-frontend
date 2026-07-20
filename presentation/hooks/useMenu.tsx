import { getMenuByBusinessAction } from "@/core/actions/menu/get-menu-by-business.action";
import { useQuery } from "@tanstack/react-query";

export const useMenu = (businessId: number) => {
  const menuQuery = useQuery({
    queryKey: ["menu", businessId],
    queryFn: () => getMenuByBusinessAction(businessId),
    staleTime: 1000 * 60 * 60,
  });

  return { menuQuery };
};
