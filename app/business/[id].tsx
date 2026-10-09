import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBusiness } from "@/presentation/hooks/useBusiness";
import { useMenu } from "@/presentation/hooks/useMenu";
import { useQualification } from "@/presentation/hooks/useQualification";
import { useBusinessQualifications } from "@/presentation/hooks/useBusinessQualifications";
import { useProfile } from "@/presentation/hooks/useProfile";
import BusinessHeader from "@/presentation/components/business/BusinessHeader";
import BusinessMenu from "@/presentation/components/business/BusinessMenu";
import QualificationBadge from "@/presentation/components/qualification/QualificationBadge";
import ReviewList from "@/presentation/components/qualification/ReviewList";
import BackButton from "@/presentation/components/shared/BackButton";
import LocationMap from "@/presentation/components/shared/LocationMap";

const BusinessDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const safeArea = useSafeAreaInsets();
  const businessId = +id;

  const { businessQuery } = useBusiness(businessId);
  const { menuQuery } = useMenu(businessId);
  const { qualificationsQuery } = useQualification();
  const { businessQualificationsQuery } = useBusinessQualifications(businessId);
  const { profileQuery } = useProfile();

  const existingQualification =
    qualificationsQuery.data?.find((q) => q.business === businessId) ?? null;

  if (businessQuery.isLoading || menuQuery.isLoading || qualificationsQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#2292A4" size={40} />
      </View>
    );
  }

  const business = businessQuery.data;

  return (
    <ScrollView className="bg-xiri-cream">
      <BackButton />
      <View style={{ paddingTop: safeArea.top }}>
        {/* Info del negocio */}
        <BusinessHeader
          name={business?.name ?? "Negocio"}
          address={business?.address ?? ""}
          contactNumber={business?.contactNumber ?? ""}
          ownerName={business?.ownerName}
          latitude={business?.latitude}
          longitude={business?.longitude}
          averageRating={business?.averageRating}
          totalReviews={business?.totalReviews}
        />

        {/* Menú */}
        <BusinessMenu menu={menuQuery.data ?? []} />

        {/* Mapa */}
        {business?.latitude && business?.longitude && (
          <LocationMap
            latitude={business.latitude}
            longitude={business.longitude}
            title={business.name}
          />
        )}

        {/* Mi Calificación */}
        <View className="px-5 mt-6">
          <Text className="text-lg font-bold text-gray-800 mb-3">
            Mi Calificación
          </Text>

          {existingQualification ? (
            <QualificationBadge
              qualification={existingQualification.qualification}
              comment={existingQualification.comment}
              evidenceImage={existingQualification.evidenceImage}
              creationDate={existingQualification.creationDate}
            />
          ) : (
            <TouchableOpacity
              className="bg-xiri-teal rounded-lg py-3 flex-row items-center justify-center"
              onPress={() =>
                router.push(
                  `/qualify/${businessId}?name=${encodeURIComponent(business?.name ?? "Negocio")}`,
                )
              }
            >
              <Ionicons name="star-outline" size={20} color="#fff" />
              <Text className="text-white font-semibold text-base ml-2">
                Calificar este negocio
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Reseñas de todos los usuarios */}
        <ReviewList
          title="Reseñas"
          reviews={businessQualificationsQuery.data ?? []}
          currentUserId={profileQuery.data?.id ?? null}
        />

        <View className="h-8" />
      </View>
    </ScrollView>
  );
};

export default BusinessDetailScreen;
