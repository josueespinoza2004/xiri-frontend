import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAdminMenus } from "@/presentation/hooks/useAdminMenus";
import { getMenuItemsAction, BusinessMenuItemResponse } from "@/core/actions/admin/get-menu-items.action";
import ChipSelector from "@/presentation/components/shared/ChipSelector";
import BackButton from "@/presentation/components/shared/BackButton";

const AdminMenusScreen = () => {
  const safeArea = useSafeAreaInsets();
  const [selectedBusiness, setSelectedBusiness] = useState<number | undefined>();
  const [menuItems, setMenuItems] = useState<BusinessMenuItemResponse[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<number | null>(null);
  const [price, setPrice] = useState("");

  const { businessesQuery, menuQuery, createMutation, deleteMutation } =
    useAdminMenus(selectedBusiness);

  const handleSelectBusiness = async (id: number) => {
    setSelectedBusiness(id);
    setSelectedMenuItem(null);
    try {
      const items = await getMenuItemsAction(id);
      setMenuItems(items);
    } catch {
      setMenuItems([]);
    }
  };

  const handleCreate = () => {
    if (!selectedBusiness || !selectedMenuItem || !price) {
      Alert.alert("Error", "Seleccioná un platillo y poné el precio");
      return;
    }

    createMutation.mutate(
      {
        business: selectedBusiness,
        menuItem: selectedMenuItem,
        price,
      },
      {
        onSuccess: () => {
          Alert.alert("Éxito", "Menú creado");
          setSelectedMenuItem(null);
          setPrice("");
        },
        onError: (error: any) => {
          const msg = typeof error === "string" ? error : "Error al crear";
          Alert.alert("Error", msg);
        },
      },
    );
  };

  const handleDelete = (id: number) => {
    Alert.alert("Eliminar", "¿Eliminar este item del menú?", [
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
        <ActivityIndicator color="#2563eb" size={50} />
      </View>
    );
  }

  const businessItems = (businessesQuery.data ?? []).map((b) => ({
    id: b.id,
    label: b.name,
  }));

  const menuItemChips = menuItems.map((m) => ({
    id: m.id,
    label: m.name,
  }));

  return (
    <ScrollView className="bg-gray-50">
      <BackButton />
      <View className="mt-2" style={{ paddingTop: safeArea.top }}>
        <Text className="text-2xl font-bold pl-14 pr-4 mb-4">Menús</Text>

        {/* Selector de negocio */}
        <View className="px-4">
          <ChipSelector
            label="Seleccioná un negocio"
            items={businessItems}
            selectedId={selectedBusiness ?? null}
            onSelect={handleSelectBusiness}
          />
        </View>

        {/* Formulario para agregar al menú */}
        {selectedBusiness && (
          <View className="px-4 mt-4">
            <Text className="text-base font-bold text-gray-800 mb-3">
              Agregar al menú
            </Text>

            <ChipSelector
              label="Platillo (BusinessMenuItem)"
              items={menuItemChips}
              selectedId={selectedMenuItem}
              onSelect={(id) => setSelectedMenuItem(id)}
            />

            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base"
              placeholder="Precio (ej: 150.00)"
              keyboardType="decimal-pad"
              value={price}
              onChangeText={setPrice}
            />

            <TouchableOpacity
              className="bg-blue-600 rounded-lg py-3 items-center"
              onPress={handleCreate}
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-semibold text-base">
                  Agregar
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* Menú actual del negocio seleccionado */}
        {selectedBusiness && (
          <View className="mt-6">
            <Text className="text-base font-bold px-4 mb-3">Menú actual</Text>
            {menuQuery.isLoading ? (
              <ActivityIndicator color="#2563eb" size={30} />
            ) : (
              <FlatList
                data={menuQuery.data ?? []}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View className="bg-white rounded-lg p-3 mb-2 mx-4 flex-row items-center">
                    <View className="flex-1">
                      <Text className="text-base font-medium text-gray-800">
                        {item.menuItemName}
                      </Text>
                      <Text className="text-sm text-blue-700">
                        C${item.price.toFixed(2)}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                      <Ionicons name="trash-outline" size={20} color="#dc2626" />
                    </TouchableOpacity>
                  </View>
                )}
                ListEmptyComponent={
                  <Text className="text-center text-gray-400 mt-4">
                    Este negocio no tiene menú
                  </Text>
                }
              />
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default AdminMenusScreen;
