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
import BackButton from "@/presentation/components/shared/BackButton";

const AdminMenusScreen = () => {
  const safeArea = useSafeAreaInsets();
  const [selectedBusiness, setSelectedBusiness] = useState<number | undefined>();
  const { businessesQuery, menuQuery, createMutation, deleteMutation } =
    useAdminMenus(selectedBusiness);

  const [form, setForm] = useState({
    menuItem: "",
    price: "",
  });

  const handleCreate = () => {
    if (!selectedBusiness || !form.menuItem || !form.price) {
      Alert.alert("Error", "Seleccioná un negocio y completá los campos");
      return;
    }

    createMutation.mutate(
      {
        business: selectedBusiness,
        menuItem: parseInt(form.menuItem),
        price: form.price,
      },
      {
        onSuccess: () => {
          Alert.alert("Éxito", "Menú creado");
          setForm({ menuItem: "", price: "" });
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

  return (
    <ScrollView className="bg-gray-50">
      <BackButton />
      <View className="mt-2" style={{ paddingTop: safeArea.top }}>
        <Text className="text-2xl font-bold pl-14 pr-4 mb-4">Menús</Text>

        {/* Selector de negocio */}
        <View className="px-4">
          <Text className="text-sm text-gray-500 mb-2">Seleccioná un negocio:</Text>
          <FlatList
            data={businessesQuery.data ?? []}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`mr-2 px-4 py-2 rounded-full ${
                  selectedBusiness === item.id ? "bg-blue-600" : "bg-gray-200"
                }`}
                onPress={() => setSelectedBusiness(item.id)}
              >
                <Text
                  className={`text-sm font-medium ${
                    selectedBusiness === item.id ? "text-white" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Formulario para agregar al menú */}
        {selectedBusiness && (
          <View className="px-4 mt-6">
            <Text className="text-base font-bold text-gray-800 mb-3">
              Agregar al menú
            </Text>

            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base"
              placeholder="ID del menu item (BusinessMenuItem)"
              keyboardType="number-pad"
              value={form.menuItem}
              onChangeText={(v) => setForm((p) => ({ ...p, menuItem: v }))}
            />

            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base"
              placeholder="Precio (ej: 150.00)"
              keyboardType="decimal-pad"
              value={form.price}
              onChangeText={(v) => setForm((p) => ({ ...p, price: v }))}
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
