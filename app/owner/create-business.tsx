import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMyBusinesses } from "@/presentation/hooks/useMyBusinesses";
import BackButton from "@/presentation/components/shared/BackButton";
import KeyboardAware from "@/presentation/components/shared/KeyboardAware";

const CreateBusinessScreen = () => {
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { createMutation } = useMyBusinesses();

  const [form, setForm] = useState({
    name: "",
    address: "",
    contact_number: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = () => {
    if (!form.name || !form.address || !form.contact_number) {
      Alert.alert("Error", "Nombre, dirección y contacto son requeridos");
      return;
    }

    createMutation.mutate(
      {
        name: form.name,
        address: form.address,
        contact_number: form.contact_number,
        latitude: form.latitude || undefined,
        longitude: form.longitude || undefined,
      },
      {
        onSuccess: () => {
          Alert.alert("Éxito", "Negocio creado", [
            { text: "OK", onPress: () => router.back() },
          ]);
        },
        onError: (error: any) => {
          const msg = typeof error === "string" ? error : "Error al crear";
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
          <Text className="text-xl font-bold text-xiri-dark pl-10 mb-6">
            Nuevo Negocio
          </Text>

          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base bg-white"
            placeholder="Nombre del negocio"
            value={form.name}
            onChangeText={(v) => handleChange("name", v)}
          />

          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base bg-white"
            placeholder="Dirección"
            value={form.address}
            onChangeText={(v) => handleChange("address", v)}
          />

          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base bg-white"
            placeholder="Número de contacto"
            keyboardType="phone-pad"
            value={form.contact_number}
            onChangeText={(v) => handleChange("contact_number", v)}
          />

          <View className="flex-row gap-3 mb-3">
            <TextInput
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base bg-white"
              placeholder="Latitud"
              keyboardType="decimal-pad"
              value={form.latitude}
              onChangeText={(v) => handleChange("latitude", v)}
            />
            <TextInput
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base bg-white"
              placeholder="Longitud"
              keyboardType="decimal-pad"
              value={form.longitude}
              onChangeText={(v) => handleChange("longitude", v)}
            />
          </View>

          <TouchableOpacity
            className="bg-xiri-teal rounded-lg py-3 items-center mt-2"
            onPress={handleCreate}
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold text-base">
                Crear Negocio
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAware>
  );
};

export default CreateBusinessScreen;
