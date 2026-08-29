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
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAdminMenuItems } from "@/presentation/hooks/useAdminMenuItems";
import BackButton from "@/presentation/components/shared/BackButton";

const OwnerMenuItemsScreen = () => {
  const { id, name } = useLocalSearchParams();
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const businessId = +id;

  const { menuItemsQuery, deleteMutation } = useAdminMenuItems(businessId);

  const handleDelete = (itemId: number, itemName: string) => {
    Alert.alert("Eliminar", `¿Eliminar platillo "${itemName}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          deleteMutation.mutate(itemId, {
            onError: (error: any) => {
              const msg = typeof error === "string" ? error : "Error al eliminar";
              Alert.alert("Error", msg);
            },
          });
        },
      },
    ]);
  };

  if (menuItemsQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-xiri-cream">
        <ActivityIndicator color="#2292A4" size={50} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-xiri-cream">
      <BackButton />
      <ScrollView>
        <View className="mt-2" style={{ paddingTop: safeArea.top }}>
          <Text className="text-2xl font-bold pl-14 pr-4 text-xiri-dark mb-4">
            Platillos de {name}
          </Text>

          <FlatList
            data={menuItemsQuery.data ?? []}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View className="bg-white rounded-lg p-3 mb-2 mx-4 flex-row items-center">
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 40, height: 40, borderRadius: 8, marginRight: 12 }}
                    resizeMode="cover"
                  />
                )}
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
            ListEmptyComponent={
              <Text className="text-center text-gray-400 mt-8">
                No hay platillos aún
              </Text>
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-6 right-6 w-14 h-14 bg-xiri-teal rounded-full justify-center items-center shadow-lg"
        onPress={() =>
          router.push(`/owner/create-menu-item/${businessId}`)
        }
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default OwnerMenuItemsScreen;
