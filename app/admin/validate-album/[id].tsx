import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAdminMenuItems } from "@/presentation/hooks/useAdminMenuItems";
import { useAdminFoods } from "@/presentation/hooks/useAdminFoods";
import ChipSelector from "@/presentation/components/shared/ChipSelector";
import BackButton from "@/presentation/components/shared/BackButton";

const ValidateAlbumScreen = () => {
  const { id, name } = useLocalSearchParams();
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { validateMutation } = useAdminMenuItems();
  const { foodsQuery } = useAdminFoods();

  const [selectedFood, setSelectedFood] = useState<number | null>(null);

  const foodItems = (foodsQuery.data ?? []).map((f) => ({
    id: f.id,
    label: f.name,
  }));

  const handleValidate = () => {
    if (!selectedFood) {
      Alert.alert("Error", "Seleccioná una comida tradicional");
      return;
    }

    validateMutation.mutate(
      { menuItemId: +id, traditionalFoodId: selectedFood },
      {
        onSuccess: () => {
          Alert.alert("Éxito", `"${name}" validado para el álbum`, [
            { text: "OK", onPress: () => router.back() },
          ]);
        },
        onError: (error: any) => {
          const msg = typeof error === "string" ? error : "Error al validar";
          Alert.alert("Error", msg);
        },
      },
    );
  };

  return (
    <ScrollView className="bg-white">
      <BackButton />
      <View style={{ paddingTop: safeArea.top }}>
        <View className="px-5 mt-4">
          <Text className="text-xl font-bold text-gray-800 pl-8 mb-2">
            Validar para Álbum
          </Text>
          <Text className="text-sm text-gray-500 mb-6">
            Asociar "{name}" con una comida tradicional
          </Text>

          <ChipSelector
            label="Comida Tradicional"
            items={foodItems}
            selectedId={selectedFood}
            onSelect={(id) => setSelectedFood(id)}
          />

          <TouchableOpacity
            className="bg-xiri-teal rounded-lg py-3 items-center mt-6"
            onPress={handleValidate}
            disabled={validateMutation.isPending}
          >
            <Text className="text-white font-semibold text-base">
              Validar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ValidateAlbumScreen;
