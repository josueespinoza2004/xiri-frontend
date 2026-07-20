import { getCollectionAction } from "@/core/actions/collection/get-collection.action";
import { addToCollectionAction } from "@/core/actions/collection/add-to-collection.action";
import { completeCollectionItemAction } from "@/core/actions/collection/complete-collection-item.action";
import { removeFromCollectionAction } from "@/core/actions/collection/remove-from-collection.action";
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

  const completeMutation = useMutation({
    mutationFn: (itemId: number) => completeCollectionItemAction(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (itemId: number) => removeFromCollectionAction(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection"] });
    },
  });

  return {
    collectionQuery,
    addMutation,
    completeMutation,
    removeMutation,
  };
};
