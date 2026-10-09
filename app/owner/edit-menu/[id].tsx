import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAdminMenus } from "@/presentation/hooks/useAdminMenus";
import BackButton from "@/presentation/components/shared/BackButton";
import KeyboardAware from "@/presentation/components/shared/KeyboardAware";

const OwnerEditMenuScreen = () => {
  const { id, itemName, currentPrice } = useLocalSearchParams();
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { updateMutation } = useAdminMenus();

  const [price, setPrice] = useState((currentPrice as string) ?? "");

  const handleUpdate = () => {
    if (!price) {
      Alert.alert("Error", "El precio es requerido");
      return;
    }

    updateMutation.mutate(
      { id: +id, price },
      {
        onSuccess: () => {
          Alert.alert("Éxito", "Precio actualizado", [
            { text: "OK", onPress: () => router.back() },
          ]);
        },
        onError: (error: any) => {
          const msg = typeof error === "string" ? error : "Error al actualizar";
          Alert.alert("Error", msg);
        },
      },
    );
  };

  return (
    <KeyboardAware className="bg-xiri-cream">
      <BackButton />
      <View style={{ paddingTop: safeArea.top }}>
        <View className="px-5 mt-4">
          <Text className="text-xl font-bold text-xiri-dark pl-10 mb-2">
            Editar Precio
          </Text>
          <Text className="text-sm text-gray-500 mb-6">{itemName}</Text>

          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base bg-white text-xiri-dark"
            placeholder="Precio (ej: 150.00)"
            placeholderTextColor="#9ca3af"
            keyboardType="decimal-pad"
            value={price}
            onChangeText={setPrice}
          />

          <TouchableOpacity
            className="bg-xiri-teal rounded-lg py-3 items-center mt-2"
            onPress={handleUpdate}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold text-base">
                Guardar Cambios
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAware>
  );
};

export default OwnerEditMenuScreen;
