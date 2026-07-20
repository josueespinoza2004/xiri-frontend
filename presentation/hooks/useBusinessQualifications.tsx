import { getBusinessQualificationsAction } from "@/core/actions/qualification/get-business-qualifications.action";
import { useQuery } from "@tanstack/react-query";

export const useBusinessQualifications = (businessId: number) => {
  const businessQualificationsQuery = useQuery({
    queryKey: ["qualifications", "business", businessId],
    queryFn: () => getBusinessQualificationsAction(businessId),
    staleTime: 1000 * 60 * 5,
  });

  return { businessQualificationsQuery };
};
