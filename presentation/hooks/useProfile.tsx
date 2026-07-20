import { getProfileAction } from "@/core/actions/auth/get-profile.action";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  const profileQuery = useQuery({
    queryKey: ["auth", "profile"],
    queryFn: getProfileAction,
    staleTime: 1000 * 60 * 60,
  });

  return { profileQuery };
};
