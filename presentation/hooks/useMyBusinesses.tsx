import { getMyBusinessesAction } from "@/core/actions/owner/get-my-businesses.action";
import { createBusinessAction } from "@/core/actions/owner/create-business.action";
import { completeBusinessProfileAction } from "@/core/actions/owner/complete-business-profile.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface CreateParams {
  name: string;
  address: string;
  contact_number: string;
  latitude?: string;
  longitude?: string;
}

interface CompleteProfileParams {
  id: number;
  contact_number?: string;
  latitude?: string;
  longitude?: string;
}

export const useMyBusinesses = () => {
  const queryClient = useQueryClient();

  const myBusinessesQuery = useQuery({
    queryKey: ["owner", "businesses"],
    queryFn: getMyBusinessesAction,
    staleTime: 1000 * 60 * 5,
  });

  const createMutation = useMutation({
    mutationFn: (params: CreateParams) => createBusinessAction(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owner", "businesses"] });
    },
  });

  const completeProfileMutation = useMutation({
    mutationFn: (params: CompleteProfileParams) =>
      completeBusinessProfileAction(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owner", "businesses"] });
    },
  });

  return {
    myBusinessesQuery,
    createMutation,
    completeProfileMutation,
  };
};
