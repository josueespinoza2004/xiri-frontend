import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useFood } from "@/presentation/hooks/useFood";
import FoodHeader from "@/presentation/components/gastronomy/FoodHeader";
import FoodDescription from "@/presentation/components/gastronomy/FoodDescription";

const FoodScreen = () => {
  const { id } = useLocalSearchParams();

  const { foodQuery } = useFood(+id);

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
      {/* Header con imagen y botón regresar */}
      <FoodHeader image={foodQuery.data.image} />

      {/* Descripción completa */}
      <FoodDescription food={foodQuery.data} />
    </ScrollView>
  );
};

export default FoodScreen;
