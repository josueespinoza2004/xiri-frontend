import { FlatList, Text, View } from "react-native";
import { FoodCollection } from "@/infrastructure/interfaces/food-collection.interface";
import { Food } from "@/infrastructure/interfaces/gastronomy.interface";
import CollectionCard from "./CollectionCard";

interface Props {
  title: string;
  collection: FoodCollection[];
  foods: Food[];
  onPressItem?: (foodId: number) => void;
  onCompleteItem?: (itemId: number) => void;
  onRemoveItem?: (itemId: number) => void;
}

const CollectionList = ({
  title,
  collection,
  foods,
  onPressItem,
  onCompleteItem,
  onRemoveItem,
}: Props) => {
  const getFoodName = (foodId: number): string => {
    return foods.find((f) => f.id === foodId)?.name ?? "Comida desconocida";
  };

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString("es-NI", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <View className="mt-4">
      <Text className="text-xl font-bold px-4 mb-3">{title}</Text>
      <FlatList
        data={collection}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <CollectionCard
            foodName={getFoodName(item.food)}
            complete={item.complete}
            registeredDate={formatDate(item.registeredDate)}
            onPress={() => onPressItem?.(item.food)}
            onComplete={() => onCompleteItem?.(item.id)}
            onRemove={() => onRemoveItem?.(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-8">
            Aún no has agregado comidas a tu colección
          </Text>
        }
      />
    </View>
  );
};

export default CollectionList;
