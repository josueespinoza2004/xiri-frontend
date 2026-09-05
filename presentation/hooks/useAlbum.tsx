import { useGastronomy } from "@/presentation/hooks/useGastronomy";
import { useCollection } from "@/presentation/hooks/useCollection";

export interface AlbumFood {
  id: number;
  name: string;
  image: string;
  departmentName: string;
  collected: boolean;
}

export const useAlbum = () => {
  const { foodsQuery } = useGastronomy();
  const { collectionQuery } = useCollection();

  const isLoading = foodsQuery.isLoading || collectionQuery.isLoading;

  const collectedIds = new Set(
    (collectionQuery.data ?? [])
      .filter((item) => item.complete)
      .map((item) => item.traditionalFood),
  );

  const albumFoods: AlbumFood[] = (foodsQuery.data ?? []).map((food) => ({
    id: food.id,
    name: food.name,
    image: food.image,
    departmentName: food.departmentName,
    collected: collectedIds.has(food.id),
  }));

  const total = albumFoods.length;
  const collected = albumFoods.filter((f) => f.collected).length;

  return {
    isLoading,
    albumFoods,
    total,
    collected,
  };
};
