import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoutes } from "@/presentation/hooks/useRoutes";
import RouteList from "@/presentation/components/routes/RouteList";

const RoutesScreen = () => {
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
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
      <View className="mt-2" style={{ paddingTop: safeArea.top }}>
        <Text className="text-3xl font-bold px-4 mb-2">Rutas</Text>

        <RouteList
          title="Rutas Gastronómicas"
          routes={routesQuery.data ?? []}
          onPressRoute={(id, name) =>
            router.push(`/route/${id}?name=${encodeURIComponent(name)}`)
          }
        />
      </View>
    </ScrollView>
  );
};

export default RoutesScreen;
