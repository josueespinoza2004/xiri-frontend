import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBusiness } from "@/presentation/hooks/useBusiness";
import BusinessHeader from "@/presentation/components/business/BusinessHeader";
import AdminOptionCard from "@/presentation/components/admin/AdminOptionCard";
import LocationMap from "@/presentation/components/shared/LocationMap";
import BackButton from "@/presentation/components/shared/BackButton";

const OwnerBusinessScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const safeArea = useSafeAreaInsets();
  const businessId = +id;

  const { businessQuery } = useBusiness(businessId);

  if (businessQuery.isLoading || !businessQuery.data) {
    return (
      <View className="flex-1 justify-center items-center bg-xiri-cream">
        <ActivityIndicator color="#2292A4" size={40} />
      </View>
    );
  }

  const business = businessQuery.data;
  const name = encodeURIComponent(business.name);

  return (
    <ScrollView className="bg-xiri-cream">
      <BackButton />
      <View style={{ paddingTop: safeArea.top }}>
        <BusinessHeader
          name={business.name}
          address={business.address}
          contactNumber={business.contactNumber}
          latitude={business.latitude}
          longitude={business.longitude}
        />

        {business.latitude && business.longitude && (
          <LocationMap
            latitude={business.latitude}
            longitude={business.longitude}
            title={business.name}
            height={160}
          />
        )}

        <View className="mt-6">
          <AdminOptionCard
            icon="create-outline"
            title="Completar Perfil"
            description="Editar contacto y ubicación"
            onPress={() =>
              router.push(`/owner/complete-profile/${businessId}`)
            }
          />

          <AdminOptionCard
            icon="pizza-outline"
            title="Platillos"
            description="Crear y gestionar platillos"
            onPress={() =>
              router.push(`/owner/menu-items/${businessId}?name=${name}`)
            }
          />

          <AdminOptionCard
            icon="restaurant-outline"
            title="Menú (Precios)"
            description="Asignar precios a tus platillos"
            onPress={() =>
              router.push(`/owner/menus/${businessId}?name=${name}`)
            }
          />

          <AdminOptionCard
            icon="star-outline"
            title="Calificaciones"
            description="Ver reseñas de tus clientes"
            onPress={() =>
              router.push(`/owner/qualifications/${businessId}?name=${name}`)
            }
          />
        </View>

        <View className="h-6" />
      </View>
    </ScrollView>
  );
};

export default OwnerBusinessScreen;
