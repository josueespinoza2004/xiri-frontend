import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import { useFood } from "@/presentation/hooks/useFood";
import { useCollection } from "@/presentation/hooks/useCollection";
import FoodHeader from "@/presentation/components/gastronomy/FoodHeader";
import FoodDescription from "@/presentation/components/gastronomy/FoodDescription";
import AddToCollectionButton from "@/presentation/components/gastronomy/AddToCollectionButton";

const FoodScreen = () => {
  const { id } = useLocalSearchParams();
  const foodId = +id;

  const { foodQuery } = useFood(foodId);
  const { collectionQuery, addMutation } = useCollection();

  const isInCollection =
    collectionQuery.data?.some((item) => item.food === foodId) ?? false;

  const handleAddToCollection = () => {
    addMutation.mutate(foodId, {
      onSuccess: () => {
        Alert.alert("Éxito", "Comida agregada a tu colección");
      },
      onError: (error: any) => {
        const message =
          typeof error === "string" ? error : "No se pudo agregar";
        Alert.alert("Error", message);
      },
    });
  };

  if (foodQuery.isLoading || !foodQuery.data) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="mb-4">Cargando...</Text>
        <ActivityIndicator color="#2563eb" size={30} />
      </View>
    );
  }

  return (
    <ScrollView>
      <FoodHeader image={foodQuery.data.image} />
      <FoodDescription food={foodQuery.data} />
      <AddToCollectionButton
        isInCollection={isInCollection}
        isPending={addMutation.isPending}
        onPress={handleAddToCollection}
      />
    </ScrollView>
  );
};

export default FoodScreen;
