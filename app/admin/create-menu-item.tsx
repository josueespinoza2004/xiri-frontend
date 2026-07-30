import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAdminMenuItems } from "@/presentation/hooks/useAdminMenuItems";
import { useAdminFoods } from "@/presentation/hooks/useAdminFoods";
import MenuItemForm from "@/presentation/components/admin/MenuItemForm";
import BackButton from "@/presentation/components/shared/BackButton";

const CreateMenuItemScreen = () => {
  const { businessId } = useLocalSearchParams();
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { createMutation } = useAdminMenuItems();
  const { foodsQuery } = useAdminFoods();

  const [form, setForm] = useState({
    name: "",
    description: "",
    isTraditionalVariant: false,
    traditionalFood: null as number | null,
  });

  const [image, setImage] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);

  const handleChangeField = (field: string, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

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

  const handleCreate = () => {
    if (!form.name || !form.description) {
      Alert.alert("Error", "Nombre y descripción son requeridos");
      return;
    }

    createMutation.mutate(
      {
        name: form.name,
        description: form.description,
        business: +businessId,
        isTraditionalVariant: form.isTraditionalVariant,
        traditionalFood: form.isTraditionalVariant ? form.traditionalFood : null,
        image: image ?? undefined,
      },
      {
        onSuccess: () => {
          Alert.alert("Éxito", "Platillo creado", [
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
    <ScrollView className="bg-white">
      <BackButton />
      <View style={{ paddingTop: safeArea.top }}>
        <MenuItemForm
          form={form}
          imageUri={image?.uri ?? null}
          foods={foodsQuery.data ?? []}
          isPending={createMutation.isPending}
          onChangeField={handleChangeField}
          onPickImage={handlePickImage}
          onSubmit={handleCreate}
        />
      </View>
    </ScrollView>
  );
};

export default CreateMenuItemScreen;
