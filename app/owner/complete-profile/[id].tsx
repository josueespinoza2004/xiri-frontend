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
import { useBusiness } from "@/presentation/hooks/useBusiness";
import { useMyBusinesses } from "@/presentation/hooks/useMyBusinesses";
import BackButton from "@/presentation/components/shared/BackButton";
import KeyboardAware from "@/presentation/components/shared/KeyboardAware";

const CompleteProfileScreen = () => {
  const { id } = useLocalSearchParams();
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const businessId = +id;

  const { businessQuery } = useBusiness(businessId);
  const { completeProfileMutation } = useMyBusinesses();

  const [form, setForm] = useState<{
    contact_number: string;
    latitude: string;
    longitude: string;
  } | null>(null);

  if (businessQuery.data && !form) {
    setForm({
      contact_number: businessQuery.data.contactNumber ?? "",
      latitude: businessQuery.data.latitude?.toString() ?? "",
      longitude: businessQuery.data.longitude?.toString() ?? "",
    });
  }

  const handleSave = () => {
    if (!form) return;

    completeProfileMutation.mutate(
      {
        id: businessId,
        contact_number: form.contact_number,
        latitude: form.latitude || undefined,
        longitude: form.longitude || undefined,
      },
      {
        onSuccess: () => {
          Alert.alert("Éxito", "Perfil actualizado", [
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
      <View className="flex-1 justify-center items-center bg-xiri-cream">
        <ActivityIndicator color="#2292A4" size={40} />
      </View>
    );
  }

  return (
    <KeyboardAware className="bg-xiri-cream">
      <BackButton />
      <View style={{ paddingTop: safeArea.top }}>
        <View className="px-5 mt-4">
          <Text className="text-xl font-bold text-xiri-dark pl-10 mb-6">
            Completar Perfil
          </Text>

          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base bg-white"
            placeholder="Número de contacto"
            keyboardType="phone-pad"
            value={form.contact_number}
            onChangeText={(v) =>
              setForm((p) => (p ? { ...p, contact_number: v } : p))
            }
          />

          <View className="flex-row gap-3 mb-3">
            <TextInput
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base bg-white"
              placeholder="Latitud"
              keyboardType="decimal-pad"
              value={form.latitude}
              onChangeText={(v) =>
                setForm((p) => (p ? { ...p, latitude: v } : p))
              }
            />
            <TextInput
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base bg-white"
              placeholder="Longitud"
              keyboardType="decimal-pad"
              value={form.longitude}
              onChangeText={(v) =>
                setForm((p) => (p ? { ...p, longitude: v } : p))
              }
            />
          </View>

          <TouchableOpacity
            className="bg-xiri-teal rounded-lg py-3 items-center mt-2"
            onPress={handleSave}
            disabled={completeProfileMutation.isPending}
          >
            {completeProfileMutation.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold text-base">
                Guardar
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAware>
  );
};

export default CompleteProfileScreen;
