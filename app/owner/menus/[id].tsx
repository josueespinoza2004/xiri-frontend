import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAdminMenus } from "@/presentation/hooks/useAdminMenus";
import { useAdminMenuItems } from "@/presentation/hooks/useAdminMenuItems";
import ChipSelector from "@/presentation/components/shared/ChipSelector";
import BackButton from "@/presentation/components/shared/BackButton";
import KeyboardAware from "@/presentation/components/shared/KeyboardAware";

const OwnerMenusScreen = () => {
  const { id, name } = useLocalSearchParams();
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const businessId = +id;

  const { menuQuery, createMutation, deleteMutation } = useAdminMenus(businessId);
  const { menuItemsQuery } = useAdminMenuItems(businessId);

  const [selectedMenuItem, setSelectedMenuItem] = useState<number | null>(null);
  const [price, setPrice] = useState("");

  const handleCreate = () => {
    if (!selectedMenuItem || !price) {
      Alert.alert("Error", "Seleccioná un platillo y poné el precio");
      return;
    }

    createMutation.mutate(
      { business: businessId, menuItem: selectedMenuItem, price },
      {
        onSuccess: () => {
          Alert.alert("Éxito", "Precio agregado al menú");
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

  const handleDelete = (menuId: number) => {
    Alert.alert("Eliminar", "¿Eliminar este item del menú?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          deleteMutation.mutate(menuId, {
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

  const menuItemChips = (menuItemsQuery.data ?? []).map((m) => ({
    id: m.id,
    label: m.name,
  }));

  return (
    <KeyboardAware className="bg-xiri-cream">
      <BackButton />
      <View className="mt-2" style={{ paddingTop: safeArea.top }}>
        <Text className="text-2xl font-bold pl-14 pr-4 text-xiri-dark mb-4">
          Menú de {name}
        </Text>

        {/* Agregar al menú */}
        <View className="px-4">
          <Text className="text-base font-bold text-gray-800 mb-3">
            Agregar precio
          </Text>

          <ChipSelector
            label="Platillo"
            items={menuItemChips}
            selectedId={selectedMenuItem}
            onSelect={(itemId) => setSelectedMenuItem(itemId)}
          />

          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base bg-white"
            placeholder="Precio (ej: 150.00)"
            keyboardType="decimal-pad"
            value={price}
            onChangeText={setPrice}
          />

          <TouchableOpacity
            className="bg-xiri-teal rounded-lg py-3 items-center"
            onPress={handleCreate}
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold text-base">Agregar</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Menú actual */}
        <View className="mt-6">
          <Text className="text-base font-bold px-4 mb-3">Menú actual</Text>
          {menuQuery.isLoading ? (
            <ActivityIndicator color="#2292A4" size={30} />
          ) : (
            <FlatList
              data={menuQuery.data ?? []}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View className="bg-white rounded-lg p-3 mb-2 mx-4 flex-row items-center">
                  <TouchableOpacity
                    className="flex-1"
                    onPress={() =>
                      router.push(
                        `/owner/edit-menu/${item.id}?itemName=${encodeURIComponent(item.menuItemName)}&currentPrice=${item.price}`,
                      )
                    }
                  >
                    <Text className="text-base font-medium text-gray-800">
                      {item.menuItemName}
                    </Text>
                    <Text className="text-sm text-xiri-teal">
                      C${item.price.toFixed(2)}
                    </Text>
                  </TouchableOpacity>
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

        <View className="h-6" />
      </View>
    </KeyboardAware>
  );
};

export default OwnerMenusScreen;
