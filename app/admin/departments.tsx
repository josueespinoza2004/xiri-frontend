import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAdminDepartments } from "@/presentation/hooks/useAdminDepartments";
import DepartmentForm from "@/presentation/components/admin/DepartmentForm";
import BackButton from "@/presentation/components/shared/BackButton";

const AdminDepartmentsScreen = () => {
  const safeArea = useSafeAreaInsets();
  const { departmentsQuery, createMutation, deleteMutation } =
    useAdminDepartments();

  const [form, setForm] = useState({
    name: "",
    description: "",
    latitude: "",
    longitude: "",
  });

  const handleChangeField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = () => {
    if (!form.name || !form.description || !form.latitude || !form.longitude) {
      Alert.alert("Error", "Todos los campos son requeridos");
      return;
    }

    createMutation.mutate(form, {
      onSuccess: () => {
        Alert.alert("Éxito", "Departamento creado");
        setForm({ name: "", description: "", latitude: "", longitude: "" });
      },
      onError: (error: any) => {
        const msg = typeof error === "string" ? error : "Error al crear";
        Alert.alert("Error", msg);
      },
    });
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

  if (departmentsQuery.isLoading) {
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
          Departamentos
        </Text>

        <DepartmentForm
          form={form}
          isPending={createMutation.isPending}
          onChangeField={handleChangeField}
          onSubmit={handleCreate}
        />

        <View className="mt-6">
          <Text className="text-base font-bold px-4 mb-3">Existentes</Text>
          <FlatList
            data={departmentsQuery.data ?? []}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View className="bg-white rounded-lg p-3 mb-2 mx-4 flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-base font-medium text-gray-800">
                    {item.name}
                  </Text>
                  <Text className="text-xs text-gray-500" numberOfLines={1}>
                    {item.description}
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

export default AdminDepartmentsScreen;
