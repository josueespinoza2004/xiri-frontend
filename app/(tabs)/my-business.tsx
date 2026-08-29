import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMyBusinesses } from "@/presentation/hooks/useMyBusinesses";
import MyBusinessCard from "@/presentation/components/owner/MyBusinessCard";

const MyBusinessScreen = () => {
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { myBusinessesQuery } = useMyBusinesses();

  if (myBusinessesQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-xiri-cream">
        <ActivityIndicator color="#2292A4" size={50} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-xiri-cream">
      <ScrollView>
        <View className="mt-2" style={{ paddingTop: safeArea.top }}>
          <Text className="text-3xl font-bold px-4 text-xiri-dark mb-2">
            Mis Negocios
          </Text>
          <Text className="text-sm text-gray-500 px-4 mb-4">
            Gestioná tus negocios, platillos y menús
          </Text>

          {(myBusinessesQuery.data ?? []).map((business) => (
            <MyBusinessCard
              key={business.id}
              business={business}
              onPress={() => router.push(`/owner/business/${business.id}`)}
            />
          ))}

          {myBusinessesQuery.data?.length === 0 && (
            <Text className="text-center text-gray-400 mt-8">
              Aún no tenés negocios registrados
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Botón flotante para crear negocio */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 w-14 h-14 bg-xiri-teal rounded-full justify-center items-center shadow-lg"
        onPress={() => router.push("/owner/create-business")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default MyBusinessScreen;
