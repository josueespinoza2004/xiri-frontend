import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAdminFoods } from "@/presentation/hooks/useAdminFoods";
import { useAdminDepartments } from "@/presentation/hooks/useAdminDepartments";
import FoodForm from "@/presentation/components/admin/FoodForm";
import BackButton from "@/presentation/components/shared/BackButton";

const EditFoodScreen = () => {
  const { id, name, description, culturalOrigin, departmentOrigin } =
    useLocalSearchParams();
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { updateMutation } = useAdminFoods();
  const { departmentsQuery } = useAdminDepartments();

  const [form, setForm] = useState({
    name: (name as string) ?? "",
    description: (description as string) ?? "",
    culturalOrigin: (culturalOrigin as string) ?? "",
    departmentOrigin: departmentOrigin ? +departmentOrigin : null,
  });

  const [image, setImage] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);

  const handleChangeField = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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
    if (!form.name || !form.description || !form.culturalOrigin || !form.departmentOrigin) {
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

  return (
    <ScrollView className="bg-white">
      <BackButton />
      <View style={{ paddingTop: safeArea.top }}>
        <FoodForm
          form={form}
          imageUri={image?.uri ?? null}
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
