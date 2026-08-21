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
import { useAdminBusinesses } from "@/presentation/hooks/useAdminBusinesses";
import BackButton from "@/presentation/components/shared/BackButton";

const AdminBusinessesScreen = () => {
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { businessesQuery, deleteMutation } = useAdminBusinesses();

  const handleDelete = (id: number, name: string) => {
    Alert.alert("Eliminar", `¿Eliminar negocio "${name}"?`, [
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

  if (businessesQuery.isLoading) {
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
            Negocios
          </Text>

          <FlatList
            data={businessesQuery.data ?? []}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View className="bg-white rounded-lg p-3 mb-2 mx-4 flex-row items-center">
                <TouchableOpacity
                  className="flex-1"
                  onPress={() => router.push(`/admin/edit-business/${item.id}`)}
                >
                  <Text className="text-base font-medium text-gray-800">
                    {item.name}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Ionicons name="location-outline" size={14} color="#6b7280" />
                    <Text className="text-xs text-gray-500 ml-1" numberOfLines={1}>
                      {item.address}
                    </Text>
                  </View>
                  {item.contactNumber && (
                    <View className="flex-row items-center mt-1">
                      <Ionicons name="call-outline" size={14} color="#6b7280" />
                      <Text className="text-xs text-gray-500 ml-1">
                        {item.contactNumber}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id, item.name)}>
                  <Ionicons name="trash-outline" size={20} color="#dc2626" />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <Text className="text-center text-gray-400 mt-8">
                No hay negocios registrados
              </Text>
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminBusinessesScreen;
