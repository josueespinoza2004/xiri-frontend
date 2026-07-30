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
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAdminRoutes } from "@/presentation/hooks/useAdminRoutes";
import { useAdminMenus } from "@/presentation/hooks/useAdminMenus";
import AssignBusinessForm from "@/presentation/components/admin/AssignBusinessForm";
import BackButton from "@/presentation/components/shared/BackButton";

const AdminRouteDetailScreen = () => {
  const { id, name } = useLocalSearchParams();
  const safeArea = useSafeAreaInsets();
  const routeId = +id;

  const { routeBusinessesQuery, addBusinessMutation, removeBusinessMutation } =
    useAdminRoutes(routeId);
  const { businessesQuery } = useAdminMenus();

  const [form, setForm] = useState({
    business: null as number | null,
    suggestedOrder: "",
  });

  const handleChangeField = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAssign = () => {
    if (!form.business || !form.suggestedOrder) {
      Alert.alert("Error", "Todos los campos son requeridos");
      return;
    }

    addBusinessMutation.mutate(
      {
        route: routeId,
        business: form.business,
        suggestedOrder: parseInt(form.suggestedOrder),
      },
      {
        onSuccess: () => {
          Alert.alert("Éxito", "Negocio asignado a la ruta");
          setForm({ business: null, suggestedOrder: "" });
        },
        onError: (error: any) => {
          const msg = typeof error === "string" ? error : "Error al asignar";
          Alert.alert("Error", msg);
        },
      },
    );
  };

  const handleRemove = (rbId: number, businessName: string) => {
    Alert.alert("Eliminar", `¿Quitar "${businessName}" de la ruta?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Quitar",
        style: "destructive",
        onPress: () => {
          removeBusinessMutation.mutate(rbId, {
            onError: (error: any) => {
              const msg = typeof error === "string" ? error : "Error al quitar";
              Alert.alert("Error", msg);
            },
          });
        },
      },
    ]);
  };

  if (routeBusinessesQuery.isLoading) {
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
        <Text className="text-2xl font-bold pl-14 pr-4 mb-2">{name}</Text>
        <Text className="text-base text-gray-500 px-4 mb-4">
          Gestionar negocios de esta ruta
        </Text>

        <AssignBusinessForm
          form={form}
          businesses={businessesQuery.data ?? []}
          isPending={addBusinessMutation.isPending}
          onChangeField={handleChangeField}
          onSubmit={handleAssign}
        />

        <View className="mt-6">
          <Text className="text-base font-bold px-4 mb-3">Negocios asignados</Text>
          <FlatList
            data={routeBusinessesQuery.data ?? []}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View className="bg-white rounded-lg p-3 mb-2 mx-4 flex-row items-center">
                <View className="w-7 h-7 rounded-full bg-blue-100 justify-center items-center mr-3">
                  <Text className="text-xs font-bold text-blue-700">
                    {item.suggestedOrder}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-base font-medium text-gray-800">
                    {item.businessName}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {item.businessAddress}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleRemove(item.id, item.businessName)}
                >
                  <Ionicons name="trash-outline" size={20} color="#dc2626" />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <Text className="text-center text-gray-400 mt-4">
                No hay negocios asignados
              </Text>
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AdminRouteDetailScreen;
