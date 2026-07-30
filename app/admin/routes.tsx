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
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAdminRoutes } from "@/presentation/hooks/useAdminRoutes";
import { useAdminDepartments } from "@/presentation/hooks/useAdminDepartments";
import RouteForm from "@/presentation/components/admin/RouteForm";
import BackButton from "@/presentation/components/shared/BackButton";

const AdminRoutesScreen = () => {
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { routesQuery, createRouteMutation, deleteRouteMutation } = useAdminRoutes();
  const { departmentsQuery } = useAdminDepartments();

  const [form, setForm] = useState({
    name: "",
    description: "",
    department: null as number | null,
  });

  const handleChangeField = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = () => {
    if (!form.name || !form.description || !form.department) {
      Alert.alert("Error", "Todos los campos son requeridos");
      return;
    }

    createRouteMutation.mutate(
      {
        name: form.name,
        description: form.description,
        department: form.department,
      },
      {
        onSuccess: () => {
          Alert.alert("Éxito", "Ruta creada");
          setForm({ name: "", description: "", department: null });
        },
        onError: (error: any) => {
          const msg = typeof error === "string" ? error : "Error al crear";
          Alert.alert("Error", msg);
        },
      },
    );
  };

  const handleDelete = (id: number, name: string) => {
    Alert.alert("Eliminar", `¿Eliminar ruta "${name}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          deleteRouteMutation.mutate(id, {
            onError: (error: any) => {
              const msg = typeof error === "string" ? error : "Error al eliminar";
              Alert.alert("Error", msg);
            },
          });
        },
      },
    ]);
  };

  if (routesQuery.isLoading) {
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
          Rutas Gastronómicas
        </Text>

        <RouteForm
          form={form}
          departments={departmentsQuery.data ?? []}
          isPending={createRouteMutation.isPending}
          onChangeField={handleChangeField}
          onSubmit={handleCreate}
        />

        <View className="mt-6">
          <Text className="text-base font-bold px-4 mb-3">Existentes</Text>
          <FlatList
            data={routesQuery.data ?? []}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View className="bg-white rounded-lg p-3 mb-2 mx-4 flex-row items-center">
                <TouchableOpacity
                  className="flex-1 flex-row items-center"
                  onPress={() =>
                    router.push(`/admin/route-detail/${item.id}?name=${encodeURIComponent(item.name)}`)
                  }
                >
                  <View className="w-8 h-8 rounded-full bg-orange-100 justify-center items-center mr-3">
                    <Ionicons name="map-outline" size={18} color="#ea580c" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-medium text-gray-800">
                      {item.name}
                    </Text>
                    <Text className="text-xs text-gray-500">
                      {item.departmentName}
                    </Text>
                  </View>
                </TouchableOpacity>
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

export default AdminRoutesScreen;
