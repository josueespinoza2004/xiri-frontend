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
import { useAdminBusinesses } from "@/presentation/hooks/useAdminBusinesses";
import { useQuery } from "@tanstack/react-query";
import { getAllBusinessesAction } from "@/core/actions/admin/get-all-businesses.action";
import BackButton from "@/presentation/components/shared/BackButton";
import KeyboardAware from "@/presentation/components/shared/KeyboardAware";

const EditBusinessScreen = () => {
  const { id } = useLocalSearchParams();
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { updateMutation } = useAdminBusinesses();

  const businessQuery = useQuery({
    queryKey: ["admin", "business-detail", +id],
    queryFn: async () => {
      const businesses = await getAllBusinessesAction();
      return businesses.find((b) => b.id === +id) ?? null;
    },
  });

  const [form, setForm] = useState<{
    name: string;
    address: string;
    contact_number: string;
    latitude: string;
    longitude: string;
  } | null>(null);

  if (businessQuery.data && !form) {
    setForm({
      name: businessQuery.data.name,
      address: businessQuery.data.address,
      contact_number: businessQuery.data.contactNumber,
      latitude: businessQuery.data.latitude?.toString() ?? "",
      longitude: businessQuery.data.longitude?.toString() ?? "",
    });
  }

  const handleUpdate = () => {
    if (!form || !form.name || !form.address) {
      Alert.alert("Error", "Nombre y dirección son requeridos");
      return;
    }

    updateMutation.mutate(
      {
        id: +id,
        name: form.name,
        address: form.address,
        contact_number: form.contact_number,
        latitude: form.latitude || undefined,
        longitude: form.longitude || undefined,
      },
      {
        onSuccess: () => {
          Alert.alert("Éxito", "Negocio actualizado", [
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

  if (businessQuery.isLoading || !form) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#2292A4" size={40} />
      </View>
    );
  }

  return (
    <KeyboardAware className="bg-white">
      <BackButton />
      <View style={{ paddingTop: safeArea.top }}>
        <View className="px-5 mt-4">
          <Text className="text-xl font-bold text-gray-800 pl-10 mb-6">
            Editar Negocio
          </Text>

          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base"
            placeholder="Nombre del negocio"
            value={form.name}
            onChangeText={(v) => setForm((p) => (p ? { ...p, name: v } : p))}
          />

          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base"
            placeholder="Dirección"
            value={form.address}
            onChangeText={(v) => setForm((p) => (p ? { ...p, address: v } : p))}
          />

          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base"
            placeholder="Número de contacto"
            keyboardType="phone-pad"
            value={form.contact_number}
            onChangeText={(v) => setForm((p) => (p ? { ...p, contact_number: v } : p))}
          />

          <View className="flex-row gap-3 mb-3">
            <TextInput
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base"
              placeholder="Latitud"
              keyboardType="decimal-pad"
              value={form.latitude}
              onChangeText={(v) => setForm((p) => (p ? { ...p, latitude: v } : p))}
            />
            <TextInput
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base"
              placeholder="Longitud"
              keyboardType="decimal-pad"
              value={form.longitude}
              onChangeText={(v) => setForm((p) => (p ? { ...p, longitude: v } : p))}
            />
          </View>

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

export default EditBusinessScreen;
