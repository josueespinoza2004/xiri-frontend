import { useState } from "react";
import { Alert, ScrollView, View } from "react-native"
import KeyboardAware from "@/presentation/components/shared/KeyboardAware";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAdminFoods } from "@/presentation/hooks/useAdminFoods";
import { useAdminDepartments } from "@/presentation/hooks/useAdminDepartments";
import FoodForm from "@/presentation/components/admin/FoodForm";
import BackButton from "@/presentation/components/shared/BackButton";

const CreateFoodScreen = () => {
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { createMutation } = useAdminFoods();
  const { departmentsQuery } = useAdminDepartments();

  const [form, setForm] = useState({
    name: "",
    description: "",
    culturalOrigin: "",
    departmentOrigin: null as number | null,
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

  const handleCreate = () => {
    if (!form.name || !form.description || !form.culturalOrigin || !form.departmentOrigin) {
      Alert.alert("Error", "Todos los campos son requeridos");
      return;
    }

    if (!image) {
      Alert.alert("Error", "La imagen es requerida");
      return;
    }

    createMutation.mutate(
      {
        name: form.name,
        description: form.description,
        culturalOrigin: form.culturalOrigin,
        departmentOrigin: form.departmentOrigin,
        image,
      },
      {
        onSuccess: () => {
          Alert.alert("Éxito", "Comida creada", [
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
        <FoodForm
          form={form}
          imageUri={image?.uri ?? null}
          departments={departmentsQuery.data ?? []}
          isPending={createMutation.isPending}
          onChangeField={handleChangeField}
          onPickImage={handlePickImage}
          onSubmit={handleCreate}
        />
      </View>
    </KeyboardAware>
  );
};

export default CreateFoodScreen;
