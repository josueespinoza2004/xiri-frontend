import { getCollectionAction } from "@/core/actions/collection/get-collection.action";
import { addToCollectionAction } from "@/core/actions/collection/add-to-collection.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCollection = () => {
  const queryClient = useQueryClient();

  const collectionQuery = useQuery({
    queryKey: ["collection"],
    queryFn: getCollectionAction,
    staleTime: 1000 * 60 * 5,
  });

  const addMutation = useMutation({
    mutationFn: (foodId: number) => addToCollectionAction(foodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection"] });
    },
  });

  return {
    collectionQuery,
    addMutation,
  };
};
