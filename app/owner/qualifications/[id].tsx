import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBusinessQualifications } from "@/presentation/hooks/useBusinessQualifications";
import ReviewList from "@/presentation/components/qualification/ReviewList";
import BackButton from "@/presentation/components/shared/BackButton";

const OwnerQualificationsScreen = () => {
  const { id, name } = useLocalSearchParams();
  const safeArea = useSafeAreaInsets();
  const businessId = +id;

  const { businessQualificationsQuery } = useBusinessQualifications(businessId);

  if (businessQualificationsQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-xiri-cream">
        <ActivityIndicator color="#2292A4" size={50} />
      </View>
    );
  }

  const reviews = businessQualificationsQuery.data ?? [];
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.qualification, 0) / reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <ScrollView className="bg-xiri-cream">
      <BackButton />
      <View className="mt-2" style={{ paddingTop: safeArea.top }}>
        <Text className="text-2xl font-bold pl-14 pr-4 text-xiri-dark mb-2">
          Calificaciones de {name}
        </Text>

        {/* Promedio */}
        <View className="mx-4 mt-2 mb-2 bg-white rounded-2xl p-4 flex-row items-center">
          <Text className="text-4xl font-bold text-xiri-orange mr-3">
            {avgRating}
          </Text>
          <View>
            <Text className="text-sm text-gray-600">
              {reviews.length} reseña{reviews.length !== 1 ? "s" : ""}
            </Text>
            <Text className="text-xs text-gray-400">Promedio de calificación</Text>
          </View>
        </View>

        <ReviewList title="Reseñas" reviews={reviews} currentUserId={null} />

        <View className="h-6" />
      </View>
    </ScrollView>
  );
};

export default OwnerQualificationsScreen;
