import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCollection } from "@/presentation/hooks/useCollection";
import { useGastronomy } from "@/presentation/hooks/useGastronomy";
import CollectionList from "@/presentation/components/collection/CollectionList";

const CollectionScreen = () => {
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { collectionQuery, completeMutation, removeMutation } = useCollection();
  const { foodsQuery } = useGastronomy();

  if (collectionQuery.isLoading || foodsQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#2563eb" size={50} />
      </View>
    );
  }

  const handleComplete = (itemId: number) => {
    completeMutation.mutate(itemId, {
      onError: (error: any) => {
        const message =
          typeof error === "string" ? error : "No se pudo completar";
        Alert.alert("Error", message);
      },
    });
  };

  const handleRemove = (itemId: number) => {
    Alert.alert("Eliminar", "¿Querés eliminar esta comida de tu colección?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          removeMutation.mutate(itemId, {
            onError: (error: any) => {
              const message =
                typeof error === "string" ? error : "No se pudo eliminar";
              Alert.alert("Error", message);
            },
          });
        },
      },
    ]);
  };

  return (
    <ScrollView className="bg-gray-50">
      <View className="mt-2" style={{ paddingTop: safeArea.top }}>
        <Text className="text-3xl font-bold px-4 mb-2">Mi Colección</Text>

        <CollectionList
          title="Comidas probadas"
          collection={collectionQuery.data ?? []}
          foods={foodsQuery.data ?? []}
          onPressItem={(foodId) => router.push(`/food/${foodId}`)}
          onCompleteItem={handleComplete}
          onRemoveItem={handleRemove}
        />
      </View>
    </ScrollView>
  );
};

export default CollectionScreen;
