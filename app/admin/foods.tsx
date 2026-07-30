import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAdminFoods } from "@/presentation/hooks/useAdminFoods";
import { useAdminDepartments } from "@/presentation/hooks/useAdminDepartments";
import FoodForm from "@/presentation/components/admin/FoodForm";
import BackButton from "@/presentation/components/shared/BackButton";

const AdminFoodsScreen = () => {
  const safeArea = useSafeAreaInsets();
  const { foodsQuery, createMutation, deleteMutation } = useAdminFoods();
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
          Alert.alert("Éxito", "Comida creada");
          setForm({ name: "", description: "", culturalOrigin: "", departmentOrigin: null });
          setImage(null);
        },
        onError: (error: any) => {
          const msg = typeof error === "string" ? error : "Error al crear";
          Alert.alert("Error", msg);
        },
      },
    );
  };

  const handleDelete = (id: number, name: string) => {
    Alert.alert("Eliminar", `¿Eliminar "${name}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          deleteMutation.mutate(id, {
            onError: (error: any) => {
              const msg = typeof error === "string" ? error : "Error al eliminar";
              Alert.alert("Error", msg);
            },
          });
        },
      },
    ]);
  };

  if (foodsQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#2563eb" size={50} />
      </View>
    );
  }

  return (
    <ScrollView className="bg-gray-50">
      <BackButton />
      <View className="mt-2" style={{ paddingTop: safeArea.top }}>
        <Text className="text-2xl font-bold pl-14 pr-4 mb-4">
          Comidas Tradicionales
        </Text>

        <FoodForm
          form={form}
          imageUri={image?.uri ?? null}
          departments={departmentsQuery.data ?? []}
          isPending={createMutation.isPending}
          onChangeField={handleChangeField}
          onPickImage={handlePickImage}
          onSubmit={handleCreate}
        />

        <View className="mt-6">
          <Text className="text-base font-bold px-4 mb-3">Existentes</Text>
          <FlatList
            data={foodsQuery.data ?? []}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View className="bg-white rounded-lg p-3 mb-2 mx-4 flex-row items-center">
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    className="w-10 h-10 rounded-lg mr-3"
                    resizeMode="cover"
                  />
                )}
                <View className="flex-1">
                  <Text className="text-base font-medium text-gray-800">
                    {item.name}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {item.departmentName}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handleDelete(item.id, item.name)}>
                  <Ionicons name="trash-outline" size={20} color="#dc2626" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AdminFoodsScreen;
