import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAdminMenuItems } from "@/presentation/hooks/useAdminMenuItems";
import BackButton from "@/presentation/components/shared/BackButton";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

const EditMenuItemScreen = () => {
  const { id, name, description } = useLocalSearchParams();
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { updateMutation } = useAdminMenuItems();

  const [form, setForm] = useState({
    name: (name as string) ?? "",
    description: (description as string) ?? "",
  });

  const [image, setImage] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);

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
    if (!form.name || !form.description) {
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

  return (
    <ScrollView className="bg-white">
      <BackButton />
      <View style={{ paddingTop: safeArea.top }}>
        <View className="px-5 mt-4">
          <Text className="text-xl font-bold text-gray-800 pl-8 mb-6">
            Editar Platillo
          </Text>

          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base"
            placeholder="Nombre"
            value={form.name}
            onChangeText={(v) => setForm((p) => ({ ...p, name: v }))}
          />

          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base min-h-[80px]"
            placeholder="Descripción"
            multiline
            textAlignVertical="top"
            value={form.description}
            onChangeText={(v) => setForm((p) => ({ ...p, description: v }))}
          />

          <TouchableOpacity
            className="border border-dashed border-gray-300 rounded-lg py-4 items-center justify-center mb-3"
            onPress={handlePickImage}
          >
            {image ? (
              <Image
                source={{ uri: image.uri }}
                className="w-full h-32 rounded-lg"
                resizeMode="cover"
              />
            ) : (
              <View className="items-center">
                <Ionicons name="image-outline" size={32} color="#9ca3af" />
                <Text className="text-sm text-gray-400 mt-2">
                  Cambiar imagen (opcional)
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
    </ScrollView>
  );
};

export default EditMenuItemScreen;
