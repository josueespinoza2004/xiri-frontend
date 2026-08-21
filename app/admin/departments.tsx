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
import { useAdminDepartments } from "@/presentation/hooks/useAdminDepartments";
import BackButton from "@/presentation/components/shared/BackButton";

const AdminDepartmentsScreen = () => {
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { departmentsQuery, deleteMutation } = useAdminDepartments();

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
        <ActivityIndicator color="#2292A4" size={50} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-xiri-cream">
      <BackButton />
      <ScrollView>
        <View className="mt-2" style={{ paddingTop: safeArea.top }}>
          <Text className="text-2xl font-bold pl-14 text-xiri-dark pr-4 mb-4">
            Departamentos
          </Text>

          <FlatList
            data={departmentsQuery.data ?? []}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View className="bg-white rounded-lg p-3 mb-2 mx-4 flex-row items-center justify-between">
                <TouchableOpacity
                  className="flex-1"
                  onPress={() =>
                    router.push(
                      `/admin/edit-department/${item.id}?name=${encodeURIComponent(item.name)}&description=${encodeURIComponent(item.description)}&latitude=${item.latitude}&longitude=${item.longitude}`,
                    )
                  }
                >
                  <Text className="text-base font-medium text-gray-800">
                    {item.name}
                  </Text>
                  <Text className="text-xs text-gray-500" numberOfLines={1}>
                    {item.description}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id, item.name)}>
                  <Ionicons name="trash-outline" size={20} color="#dc2626" />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <Text className="text-center text-gray-400 mt-8">
                No hay departamentos
              </Text>
            }
          />
        </View>
      </ScrollView>

      {/* Botón flotante */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 w-14 h-14 bg-xiri-teal rounded-full justify-center items-center shadow-lg"
        onPress={() => router.push("/admin/create-department")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default AdminDepartmentsScreen;
