import { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View, Image } from "react-native"
import KeyboardAware from "@/presentation/components/shared/KeyboardAware";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAdminMenuItems } from "@/presentation/hooks/useAdminMenuItems";
import { useQuery } from "@tanstack/react-query";
import { getAllMenuItemsAction } from "@/core/actions/admin/get-all-menu-items.action";
import BackButton from "@/presentation/components/shared/BackButton";
import { Ionicons } from "@expo/vector-icons";

const EditMenuItemScreen = () => {
  const { id } = useLocalSearchParams();
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { updateMutation } = useAdminMenuItems();

  // Fetch del item específico
  const itemQuery = useQuery({
    queryKey: ["admin", "menu-item-detail", +id],
    queryFn: async () => {
      const items = await getAllMenuItemsAction();
      return items.find((i) => i.id === +id) ?? null;
    },
  });

  const [form, setForm] = useState<{
    name: string;
    description: string;
  } | null>(null);

  const [image, setImage] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);

  if (itemQuery.data && !form) {
    setForm({
      name: itemQuery.data.name,
      description: itemQuery.data.description,
    });
  }

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      const fileName = asset.uri.split("/").pop() ?? "item.jpg";
      setImage({
        uri: asset.uri,
        name: fileName,
        type: asset.mimeType ?? "image/jpeg",
      });
    }
  };

  const handleUpdate = () => {
    if (!form || !form.name || !form.description) {
      Alert.alert("Error", "Nombre y descripción son requeridos");
      return;
    }

    updateMutation.mutate(
      {
        id: +id,
        name: form.name,
        description: form.description,
        image: image ?? undefined,
      },
      {
        onSuccess: () => {
          Alert.alert("Éxito", "Platillo actualizado", [
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

  if (itemQuery.isLoading || !form) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#2292A4" size={40} />
      </View>
    );
  }

  const currentImage = itemQuery.data?.image ?? null;

  return (
    <KeyboardAware className="bg-white">
      <BackButton />
      <View style={{ paddingTop: safeArea.top }}>
        <View className="px-5 mt-4">
          <Text className="text-xl font-bold text-gray-800 pl-10 mb-6">
            Editar Platillo
          </Text>

          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base"
            placeholder="Nombre"
            value={form.name}
            onChangeText={(v) => setForm((p) => (p ? { ...p, name: v } : p))}
          />

          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base min-h-[80px]"
            placeholder="Descripción"
            multiline
            textAlignVertical="top"
            value={form.description}
            onChangeText={(v) => setForm((p) => (p ? { ...p, description: v } : p))}
          />

          <TouchableOpacity
            className="border border-dashed border-gray-300 rounded-lg py-4 items-center justify-center mb-3"
            onPress={handlePickImage}
          >
            {image ? (
              <Image
                source={{ uri: image.uri }}
                style={{ width: "100%", height: 128, borderRadius: 8 }}
                resizeMode="cover"
              />
            ) : currentImage ? (
              <View className="items-center w-full">
                <Image
                  source={{ uri: currentImage }}
                  style={{ width: "100%", height: 128, borderRadius: 8 }}
                  resizeMode="cover"
                />
                <Text className="text-xs text-gray-400 mt-2">
                  Tocar para cambiar
                </Text>
              </View>
            ) : (
              <View className="items-center">
                <Ionicons name="image-outline" size={32} color="#9ca3af" />
                <Text className="text-sm text-gray-400 mt-2">
                  Agregar imagen (opcional)
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-xiri-teal rounded-lg py-3 items-center mt-2"
            onPress={handleUpdate}
            disabled={updateMutation.isPending}
          >
            <Text className="text-white font-semibold text-base">
              Guardar Cambios
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAware>
  );
};

export default EditMenuItemScreen;
