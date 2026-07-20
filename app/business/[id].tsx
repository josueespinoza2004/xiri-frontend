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
import { useMenu } from "@/presentation/hooks/useMenu";
import { useQualification } from "@/presentation/hooks/useQualification";
import { useBusinessQualifications } from "@/presentation/hooks/useBusinessQualifications";
import { useProfile } from "@/presentation/hooks/useProfile";
import { useGastronomy } from "@/presentation/hooks/useGastronomy";
import BusinessHeader from "@/presentation/components/business/BusinessHeader";
import BusinessMenu from "@/presentation/components/business/BusinessMenu";
import QualificationBadge from "@/presentation/components/qualification/QualificationBadge";
import ReviewList from "@/presentation/components/qualification/ReviewList";
import BackButton from "@/presentation/components/shared/BackButton";

const BusinessDetailScreen = () => {
  const { id, name, address, contact } = useLocalSearchParams();
  const router = useRouter();
  const safeArea = useSafeAreaInsets();
  const businessId = +id;

  const { menuQuery } = useMenu(businessId);
  const { qualificationsQuery } = useQualification();
  const { businessQualificationsQuery } = useBusinessQualifications(businessId);
  const { profileQuery } = useProfile();
  const { foodsQuery } = useGastronomy();

  const existingQualification =
    qualificationsQuery.data?.find((q) => q.business === businessId) ?? null;

  if (menuQuery.isLoading || qualificationsQuery.isLoading || foodsQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#2563eb" size={40} />
      </View>
    );
  }

  return (
    <ScrollView className="bg-white">
      <BackButton />
      <View style={{ paddingTop: safeArea.top }}>
        {/* Info del negocio */}
        <BusinessHeader
          name={(name as string) ?? "Negocio"}
          address={(address as string) ?? ""}
          contactNumber={(contact as string) ?? ""}
        />

        {/* Menú */}
        <BusinessMenu
          menu={menuQuery.data ?? []}
          foods={foodsQuery.data ?? []}
        />

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
              className="bg-blue-600 rounded-lg py-3 flex-row items-center justify-center"
              onPress={() =>
                router.push(
                  `/qualify/${businessId}?name=${encodeURIComponent((name as string) ?? "Negocio")}`,
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
