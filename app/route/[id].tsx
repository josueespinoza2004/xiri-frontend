import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouteBusinesses } from "@/presentation/hooks/useRouteBusinesses";
import { useQualification } from "@/presentation/hooks/useQualification";
import RouteBusinessCard from "@/presentation/components/routes/RouteBusinessCard";

const RouteDetailScreen = () => {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();
  const safeArea = useSafeAreaInsets();
  const { routeBusinessesQuery } = useRouteBusinesses(+id);
  const { qualificationsQuery } = useQualification();

  if (routeBusinessesQuery.isLoading || qualificationsQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#2563eb" size={50} />
      </View>
    );
  }

  const getQualificationForBusiness = (businessId: number) => {
    return qualificationsQuery.data?.find((q) => q.business === businessId) ?? null;
  };

  return (
    <ScrollView className="bg-gray-50">
      <View className="mt-2" style={{ paddingTop: safeArea.top }}>
        <Text className="text-3xl font-bold px-4 mb-2">{name}</Text>
        <Text className="text-base text-gray-500 px-4 mb-4">
          Negocios en esta ruta
        </Text>

        <FlatList
          data={routeBusinessesQuery.data ?? []}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <RouteBusinessCard
              order={item.suggestedOrder}
              businessName={item.businessName}
              businessAddress={item.businessAddress}
              existingQualification={getQualificationForBusiness(item.business)}
              onPress={() =>
                router.push(
                  `/business/${item.business}?name=${encodeURIComponent(item.businessName)}&address=${encodeURIComponent(item.businessAddress)}&contact=`,
                )
              }
            />
          )}
          ListEmptyComponent={
            <Text className="text-center text-gray-400 mt-8">
              No hay negocios asignados a esta ruta
            </Text>
          }
        />
      </View>
    </ScrollView>
  );
};

export default RouteDetailScreen;
