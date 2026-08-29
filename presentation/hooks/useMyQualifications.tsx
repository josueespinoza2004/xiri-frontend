import { getMyQualificationsAction } from "@/core/actions/owner/get-my-qualifications.action";
import { useQuery } from "@tanstack/react-query";

export const useMyQualifications = () => {
  const myQualificationsQuery = useQuery({
    queryKey: ["owner", "qualifications"],
    queryFn: getMyQualificationsAction,
    staleTime: 1000 * 60 * 5,
  });

  return { myQualificationsQuery };
};
