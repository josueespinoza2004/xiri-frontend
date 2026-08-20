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
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAdminFoods } from "@/presentation/hooks/useAdminFoods";
import BackButton from "@/presentation/components/shared/BackButton";

const AdminFoodsScreen = () => {
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { foodsQuery, deleteMutation } = useAdminFoods();

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
        <ActivityIndicator color="#2292A4" size={50} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <BackButton />
      <ScrollView>
        <View className="mt-2" style={{ paddingTop: safeArea.top }}>
          <Text className="text-2xl font-bold pl-14 pr-4 mb-4">
            Comidas Tradicionales
          </Text>

          <FlatList
            data={foodsQuery.data ?? []}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View className="bg-white rounded-lg p-3 mb-2 mx-4 flex-row items-center">
                <TouchableOpacity
                  className="flex-1 flex-row items-center"
                  onPress={() =>
                    router.push(`/admin/edit-food/${item.id}`)
                  }
                >
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
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id, item.name)}>
                  <Ionicons name="trash-outline" size={20} color="#dc2626" />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <Text className="text-center text-gray-400 mt-8">
                No hay comidas registradas
              </Text>
            }
          />
        </View>
      </ScrollView>

      {/* Botón flotante */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 w-14 h-14 bg-xiri-teal rounded-full justify-center items-center shadow-lg"
        onPress={() => router.push("/admin/create-food")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default AdminFoodsScreen;
