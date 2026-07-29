import { ActivityIndicator, Alert, FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoutes } from "@/presentation/hooks/useRoutes";
import BackButton from "@/presentation/components/shared/BackButton";

const AdminRoutesScreen = () => {
  const safeArea = useSafeAreaInsets();
  const { routesQuery } = useRoutes();

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

        <FlatList
          data={routesQuery.data ?? []}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View className="bg-white rounded-lg p-3 mb-2 mx-4 flex-row items-center">
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
            </View>
          )}
          ListEmptyComponent={
            <Text className="text-center text-gray-400 mt-8">
              No hay rutas creadas
            </Text>
          }
        />
      </View>
    </ScrollView>
  );
};

export default AdminRoutesScreen;
