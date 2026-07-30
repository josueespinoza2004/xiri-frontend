import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGastronomy } from "@/presentation/hooks/useGastronomy";
import { useRoutes } from "@/presentation/hooks/useRoutes";
import { useCollection } from "@/presentation/hooks/useCollection";
import { useProfile } from "@/presentation/hooks/useProfile";
import WelcomeBanner from "@/presentation/components/home/WelcomeBanner";
import CollectionProgress from "@/presentation/components/home/CollectionProgress";
import FoodList from "@/presentation/components/gastronomy/FoodList";
import DepartmentList from "@/presentation/components/gastronomy/DepartmentList";
import RouteList from "@/presentation/components/routes/RouteList";

const HomeScreen = () => {
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { foodsQuery, departmentsQuery } = useGastronomy();
  const { routesQuery } = useRoutes();
  const { collectionQuery } = useCollection();
  const { profileQuery } = useProfile();

  if (foodsQuery.isLoading || departmentsQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#2563eb" size={50} />
      </View>
    );
  }

  const totalFoods = foodsQuery.data?.length ?? 0;
  const collectedFoods = collectionQuery.data?.length ?? 0;

  return (
    <ScrollView>
      <View className="mt-2" style={{ paddingTop: safeArea.top }}>
        <Text className="text-3xl font-bold px-4 mb-2">Xiri</Text>

        {/* Saludo */}
        <WelcomeBanner
          firstName={profileQuery.data?.firstName ?? null}
          username={profileQuery.data?.username ?? null}
        />

        {/* Progreso de colección */}
        <CollectionProgress collected={collectedFoods} total={totalFoods} />

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
