import { getMyRequestsAction } from "@/core/actions/verification/get-my-requests.action";
import { approveRequestAction } from "@/core/actions/admin/approve-request.action";
import { rejectRequestAction } from "@/core/actions/admin/reject-request.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAdminVerification = () => {
  const queryClient = useQueryClient();

  const allRequestsQuery = useQuery({
    queryKey: ["admin", "verification-requests"],
    queryFn: getMyRequestsAction,
    staleTime: 1000 * 60 * 2,
  });

  const approveMutation = useMutation({
    mutationFn: (requestId: number) => approveRequestAction(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "verification-requests"] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ requestId, reviews }: { requestId: number; reviews: string }) =>
      rejectRequestAction(requestId, reviews),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "verification-requests"] });
    },
  });

  return {
    allRequestsQuery,
    approveMutation,
    rejectMutation,
  };
};
