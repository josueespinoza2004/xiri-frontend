import { getMyRequestsAction } from "@/core/actions/verification/get-my-requests.action";
import { createRequestAction } from "@/core/actions/verification/create-request.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface CreateParams {
  businessName: string;
  businessAddress: string;
  idCardNumber: string;
  identityDocument: { uri: string; name: string; type: string };
}

export const useVerification = () => {
  const queryClient = useQueryClient();

  const requestsQuery = useQuery({
    queryKey: ["verification", "my-requests"],
    queryFn: getMyRequestsAction,
    staleTime: 1000 * 60 * 5,
  });

  const createMutation = useMutation({
    mutationFn: (params: CreateParams) => createRequestAction(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["verification"] });
    },
  });

  return {
    requestsQuery,
    createMutation,
  };
};
