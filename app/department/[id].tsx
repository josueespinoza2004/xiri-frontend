import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFoodsByDepartment } from "@/presentation/hooks/useFoodsByDepartment";
import FoodList from "@/presentation/components/gastronomy/FoodList";

const DepartmentScreen = () => {
  const { id, name } = useLocalSearchParams();
  const safeArea = useSafeAreaInsets();

  const { foodsQuery } = useFoodsByDepartment(+id);

  if (foodsQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#2563eb" size={50} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View className="mt-2" style={{ paddingTop: safeArea.top }}>
        <Text className="text-3xl font-bold px-4 mb-2">{name}</Text>

        <FoodList
          title="Comidas del departamento"
          foods={foodsQuery.data ?? []}
        />
      </View>
    </ScrollView>
  );
};

export default DepartmentScreen;
