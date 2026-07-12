import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGastronomy } from "@/presentation/hooks/useGastronomy";
import FoodList from "@/presentation/components/gastronomy/FoodList";
import DepartmentList from "@/presentation/components/gastronomy/DepartmentList";

const HomeScreen = () => {
  const safeArea = useSafeAreaInsets();
  const { foodsQuery, departmentsQuery } = useGastronomy();

  if (foodsQuery.isLoading || departmentsQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#2563eb" size={50} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View className="mt-2" style={{ paddingTop: safeArea.top }}>
        <Text className="text-3xl font-bold px-4 mb-2">Xiri</Text>

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
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
