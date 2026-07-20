import { getQualificationsAction } from "@/core/actions/qualification/get-qualifications.action";
import { createQualificationAction } from "@/core/actions/qualification/create-qualification.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface CreateParams {
  businessId: number;
  qualification: number;
  comment?: string;
  evidenceImage: { uri: string; name: string; type: string };
}

export const useQualification = () => {
  const queryClient = useQueryClient();

  const qualificationsQuery = useQuery({
    queryKey: ["qualifications"],
    queryFn: getQualificationsAction,
    staleTime: 1000 * 60 * 5,
  });

  const createMutation = useMutation({
    mutationFn: (params: CreateParams) => createQualificationAction(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qualifications"] });
    },
  });

  return {
    qualificationsQuery,
    createMutation,
  };
};
