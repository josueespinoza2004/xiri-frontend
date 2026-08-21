import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGastronomy } from "@/presentation/hooks/useGastronomy";
import { useRoutes } from "@/presentation/hooks/useRoutes";
import { useProfile } from "@/presentation/hooks/useProfile";
import WelcomeBanner from "@/presentation/components/home/WelcomeBanner";
import Logo from "@/presentation/components/shared/Logo";
import FoodList from "@/presentation/components/gastronomy/FoodList";
import DepartmentList from "@/presentation/components/gastronomy/DepartmentList";
import RouteList from "@/presentation/components/routes/RouteList";

const HomeScreen = () => {
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { foodsQuery, departmentsQuery } = useGastronomy();
  const { routesQuery } = useRoutes();
  const { profileQuery } = useProfile();

  if (foodsQuery.isLoading || departmentsQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#2292A4" size={50} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View className="mt-2" style={{ paddingTop: safeArea.top }}>
        <View className="flex-row items-center px-4 mb-2">
          <Logo size="sm" />
        </View>

        {/* Saludo */}
        <WelcomeBanner
          firstName={profileQuery.data?.firstName ?? null}
          username={profileQuery.data?.username ?? null}
        />

        {/* Departamentos */}
        <DepartmentList
          title="Departamentos"
          departments={departmentsQuery.data ?? []}
        />

        {/* Comidas */}
        <FoodList
          title="Comidas Típicas"
          foods={foodsQuery.data ?? []}
        />

        {/* Rutas */}
        <RouteList
          title="Rutas Gastronómicas"
          routes={routesQuery.data ?? []}
          onPressRoute={(id, name) =>
            router.push(`/route/${id}?name=${encodeURIComponent(name)}`)
          }
        />

        <View className="h-6" />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
