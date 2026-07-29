import { FlatList, Text, View } from "react-native";
import { FoodCollection } from "@/infrastructure/interfaces/food-collection.interface";
import CollectionCard from "./CollectionCard";

interface Props {
  title: string;
  collection: FoodCollection[];
  onPressItem?: (foodId: number) => void;
  onCompleteItem?: (itemId: number) => void;
  onRemoveItem?: (itemId: number) => void;
}

const CollectionList = ({
  title,
  collection,
  onPressItem,
  onCompleteItem,
  onRemoveItem,
}: Props) => {
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
            foodName={item.foodName}
            complete={item.complete}
            registeredDate={formatDate(item.registeredDate)}
            onPress={() => onPressItem?.(item.traditionalFood)}
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
