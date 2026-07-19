import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCollection } from "@/presentation/hooks/useCollection";
import { useGastronomy } from "@/presentation/hooks/useGastronomy";
import CollectionList from "@/presentation/components/collection/CollectionList";

const CollectionScreen = () => {
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { collectionQuery } = useCollection();
  const { foodsQuery } = useGastronomy();

  if (collectionQuery.isLoading || foodsQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#2563eb" size={50} />
      </View>
    );
  }

  return (
    <ScrollView className="bg-gray-50">
      <View className="mt-2" style={{ paddingTop: safeArea.top }}>
        <Text className="text-3xl font-bold px-4 mb-2">Mi Colección</Text>

        <CollectionList
          title="Comidas probadas"
          collection={collectionQuery.data ?? []}
          foods={foodsQuery.data ?? []}
          onPressItem={(foodId) => router.push(`/food/${foodId}`)}
        />
      </View>
    </ScrollView>
  );
};

export default CollectionScreen;
