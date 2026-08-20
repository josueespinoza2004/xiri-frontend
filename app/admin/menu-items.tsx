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
import { useAdminMenuItems } from "@/presentation/hooks/useAdminMenuItems";
import { useAdminMenus } from "@/presentation/hooks/useAdminMenus";
import { useAdminFoods } from "@/presentation/hooks/useAdminFoods";
import ChipSelector from "@/presentation/components/shared/ChipSelector";
import BackButton from "@/presentation/components/shared/BackButton";
import { useState } from "react";

const AdminMenuItemsScreen = () => {
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const [selectedBusiness, setSelectedBusiness] = useState<number | undefined>();
  const { businessesQuery } = useAdminMenus();
  const { menuItemsQuery, deleteMutation, validateMutation } =
    useAdminMenuItems(selectedBusiness);
  const { foodsQuery } = useAdminFoods();

  const handleDelete = (id: number, name: string) => {
    Alert.alert("Eliminar", `¿Eliminar platillo "${name}"?`, [
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

  const handleValidateForAlbum = (menuItemId: number, itemName: string) => {
    const foodItems = foodsQuery.data ?? [];

    if (foodItems.length === 0) {
      Alert.alert("Error", "No hay comidas tradicionales disponibles");
      return;
    }

    const foodOptions = foodItems.map((f) => ({
      text: f.name,
      onPress: () => {
        validateMutation.mutate(
          { menuItemId, traditionalFoodId: f.id },
          {
            onSuccess: () =>
              Alert.alert("Éxito", `"${itemName}" validado para el álbum`),
            onError: (error: any) => {
              const msg = typeof error === "string" ? error : "Error al validar";
              Alert.alert("Error", msg);
            },
          },
        );
      },
    }));

    Alert.alert(
      "Validar para Álbum",
      `Asociar "${itemName}" con una comida tradicional:`,
      [
        ...foodOptions.slice(0, 5),
        { text: "Cancelar", style: "cancel" },
      ],
    );
  };

  if (businessesQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#2292A4" size={50} />
      </View>
    );
  }

  const businessItems = (businessesQuery.data ?? []).map((b) => ({
    id: b.id,
    label: b.name,
  }));

  return (
    <View className="flex-1 bg-gray-50">
      <BackButton />
      <ScrollView>
        <View className="mt-2" style={{ paddingTop: safeArea.top }}>
          <Text className="text-2xl font-bold pl-14 pr-4 mb-4">
            Platillos de Negocios
          </Text>

          <View className="px-4">
            <ChipSelector
              label="Seleccioná un negocio"
              items={businessItems}
              selectedId={selectedBusiness ?? null}
              onSelect={(id) => setSelectedBusiness(id)}
            />
          </View>

          {selectedBusiness && (
            <View className="mt-4">
              {menuItemsQuery.isLoading ? (
                <ActivityIndicator color="#2292A4" size={30} />
              ) : (
                <FlatList
                  data={menuItemsQuery.data ?? []}
                  keyExtractor={(item) => item.id.toString()}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <View className="bg-white rounded-lg p-3 mb-2 mx-4">
                      <View className="flex-row items-center">
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
                          <Text className="text-xs text-gray-500" numberOfLines={1}>
                            {item.description}
                          </Text>
                          {item.traditionalFoodName && (
                            <Text className="text-xs text-xiri-teal mt-1">
                              Variante de: {item.traditionalFoodName}
                            </Text>
                          )}
                          {item.countsForAlbum && (
                            <View className="flex-row items-center mt-1">
                              <Ionicons name="checkmark-circle" size={12} color="#16a34a" />
                              <Text className="text-xs text-green-600 ml-1">
                                Cuenta para álbum
                              </Text>
                            </View>
                          )}
                        </View>
                        <TouchableOpacity onPress={() => handleDelete(item.id, item.name)}>
                          <Ionicons name="trash-outline" size={20} color="#dc2626" />
                        </TouchableOpacity>
                      </View>

                      {/* Botón validar para álbum (solo si no está validado) */}
                      {!item.countsForAlbum && (
                        <TouchableOpacity
                          className="flex-row items-center justify-center bg-xiri-olive/10 rounded-lg py-2 mt-3"
                          onPress={() => handleValidateForAlbum(item.id, item.name)}
                        >
                          <Ionicons name="ribbon-outline" size={16} color="#BDBF09" />
                          <Text className="text-xs text-xiri-olive ml-1 font-medium">
                            Validar para Álbum
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                  ListEmptyComponent={
                    <Text className="text-center text-gray-400 mt-8">
                      Este negocio no tiene platillos
                    </Text>
                  }
                />
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Botón flotante */}
      {selectedBusiness && (
        <TouchableOpacity
          className="absolute bottom-6 right-6 w-14 h-14 bg-xiri-teal rounded-full justify-center items-center shadow-lg"
          onPress={() => router.push(`/admin/create-menu-item?businessId=${selectedBusiness}`)}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AdminMenuItemsScreen;
