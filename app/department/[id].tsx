import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFoodsByDepartment } from "@/presentation/hooks/useFoodsByDepartment";
import { useDepartment } from "@/presentation/hooks/useDepartment";
import FoodList from "@/presentation/components/gastronomy/FoodList";
import DepartmentHeader from "@/presentation/components/gastronomy/DepartmentHeader";
import BackButton from "@/presentation/components/shared/BackButton";
import LocationMap from "@/presentation/components/shared/LocationMap";

const DepartmentScreen = () => {
  const { id, name } = useLocalSearchParams();
  const safeArea = useSafeAreaInsets();

  const { foodsQuery } = useFoodsByDepartment(+id);
  const { departmentQuery } = useDepartment(+id);

  if (foodsQuery.isLoading || departmentQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#2292A4" size={50} />
      </View>
    );
  }

  return (
    <ScrollView>
      <BackButton />
      <View className="mt-2" style={{ paddingTop: safeArea.top }}>
        <Text className="text-3xl font-bold pl-14 pr-4 mb-2">{name}</Text>

        {departmentQuery.data && (
          <>
            <DepartmentHeader department={departmentQuery.data} />
            <LocationMap
              latitude={departmentQuery.data.latitude}
              longitude={departmentQuery.data.longitude}
              title={departmentQuery.data.name}
            />
          </>
        )}

        <FoodList
          title="Comidas del departamento"
          foods={foodsQuery.data ?? []}
        />
      </View>
    </ScrollView>
  );
};

export default DepartmentScreen;
