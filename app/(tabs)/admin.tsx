import { ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AdminOptionCard from "@/presentation/components/admin/AdminOptionCard";

const AdminScreen = () => {
  const safeArea = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView className="bg-xiri-cream">
      <View className="mt-2" style={{ paddingTop: safeArea.top }}>
        <Text className="text-3xl font-bold px-4 text-xiri-dark mb-2">Administración</Text>
        <Text className="text-base text-gray-500 px-4 mb-6">
          Gestión del sistema
        </Text>

        <AdminOptionCard
          icon="document-text-outline"
          title="Solicitudes de Verificación"
          description="Aprobar o rechazar solicitudes de comerciantes"
          onPress={() => router.push("/admin/verification-requests")}
        />

        <AdminOptionCard
          icon="earth-outline"
          title="Departamentos"
          description="Crear, editar y eliminar departamentos"
          onPress={() => router.push("/admin/departments")}
        />

        <AdminOptionCard
          icon="storefront-outline"
          title="Negocios"
          description="Ver, editar y eliminar negocios"
          onPress={() => router.push("/admin/businesses")}
        />

        <AdminOptionCard
          icon="fast-food-outline"
          title="Comidas Tradicionales"
          description="Gestionar el catálogo de comidas"
          onPress={() => router.push("/admin/foods")}
        />

        <AdminOptionCard
          icon="map-outline"
          title="Rutas Gastronómicas"
          description="Administrar rutas y negocios asignados"
          onPress={() => router.push("/admin/routes")}
        />

        <AdminOptionCard
          icon="pizza-outline"
          title="Platillos de Negocios"
          description="Crear y gestionar platillos por negocio"
          onPress={() => router.push("/admin/menu-items")}
        />

        <AdminOptionCard
          icon="restaurant-outline"
          title="Menús (Precios)"
          description="Asignar precios a platillos en el menú"
          onPress={() => router.push("/admin/menus")}
        />
      </View>
    </ScrollView>
  );
};

export default AdminScreen;
