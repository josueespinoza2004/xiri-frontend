import { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFood } from "@/presentation/hooks/useFood";
import { useAdminFoods } from "@/presentation/hooks/useAdminFoods";
import { useAdminDepartments } from "@/presentation/hooks/useAdminDepartments";
import FoodForm from "@/presentation/components/admin/FoodForm";
import BackButton from "@/presentation/components/shared/BackButton";

const EditFoodScreen = () => {
  const { id } = useLocalSearchParams();
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { foodQuery } = useFood(+id);
  const { updateMutation } = useAdminFoods();
  const { departmentsQuery } = useAdminDepartments();

  const [form, setForm] = useState<{
    name: string;
    description: string;
    culturalOrigin: string;
    departmentOrigin: number | null;
  } | null>(null);

  const [image, setImage] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);

  // Inicializar form cuando la data llega
  if (foodQuery.data && !form) {
    setForm({
      name: foodQuery.data.name,
      description: foodQuery.data.description,
      culturalOrigin: foodQuery.data.culturalOrigin,
      departmentOrigin: foodQuery.data.departmentOrigin,
    });
  }

  const handleChangeField = (field: string, value: string | number) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      const fileName = asset.uri.split("/").pop() ?? "food.jpg";
      setImage({
        uri: asset.uri,
        name: fileName,
        type: asset.mimeType ?? "image/jpeg",
      });
    }
  };

  const handleUpdate = () => {
    if (!form || !form.name || !form.description || !form.culturalOrigin || !form.departmentOrigin) {
      Alert.alert("Error", "Todos los campos son requeridos");
      return;
    }

    updateMutation.mutate(
      {
        id: +id,
        name: form.name,
        description: form.description,
        culturalOrigin: form.culturalOrigin,
        departmentOrigin: form.departmentOrigin,
        image: image ?? undefined,
      },
      {
        onSuccess: () => {
          Alert.alert("Éxito", "Comida actualizada", [
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

  if (foodQuery.isLoading || !form) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#2292A4" size={40} />
      </View>
    );
  }

  return (
    <ScrollView className="bg-white">
      <BackButton />
      <View style={{ paddingTop: safeArea.top }}>
        <FoodForm
          form={form}
          imageUri={image?.uri ?? null}
          currentImageUri={foodQuery.data?.image ?? null}
          departments={departmentsQuery.data ?? []}
          isPending={updateMutation.isPending}
          onChangeField={handleChangeField}
          onPickImage={handlePickImage}
          onSubmit={handleUpdate}
          submitLabel="Guardar Cambios"
        />
      </View>
    </ScrollView>
  );
};

export default EditFoodScreen;
