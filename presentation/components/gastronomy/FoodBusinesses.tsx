import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Business } from "@/infrastructure/interfaces/business.interface";

interface Props {
  businesses: Business[];
  isLoading: boolean;
}

const FoodBusinesses = ({ businesses, isLoading }: Props) => {
  const router = useRouter();

  return (
    <View className="px-5 mt-6">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-bold text-gray-800">
          Negocios donde probar este platillo
        </Text>
        <Text className="text-xs text-xiri-teal font-medium">
          {businesses.length} disponibles
        </Text>
      </View>

      {isLoading ? (
        <View className="py-6 items-center">
          <ActivityIndicator color="#2292A4" size="small" />
          <Text className="text-xs text-gray-400 mt-2">Buscando negocios...</Text>
        </View>
      ) : businesses.length === 0 ? (
        <View className="bg-white rounded-xl p-4 border border-dashed border-gray-300 items-center justify-center py-6">
          <Ionicons name="storefront-outline" size={32} color="#9ca3af" />
          <Text className="text-sm font-semibold text-gray-600 mt-2 text-center">
            Aún no hay negocios registrados con este platillo
          </Text>
          <Text className="text-xs text-gray-400 mt-1 text-center">
            Pronto los dueños de negocios agregarán este platillo a sus menús.
          </Text>
        </View>
      ) : (
        <View className="space-y-3">
          {businesses.map((business) => (
            <TouchableOpacity
              key={business.id}
              className="bg-white rounded-2xl p-4 shadow-sm shadow-black/5 border border-gray-100 flex-row items-center active:opacity-80"
              onPress={() => router.push(`/business/${business.id}`)}
            >
              <View className="w-12 h-12 rounded-full bg-xiri-orange/15 justify-center items-center mr-3.5">
                <Ionicons name="storefront" size={22} color="#D96C06" />
              </View>

              <View className="flex-1 mr-2">
                <Text className="font-bold text-base text-gray-800" numberOfLines={1}>
                  {business.name}
                </Text>

                <View className="flex-row items-center mt-1">
                  {business.average_rating ? (
                    <View className="flex-row items-center mr-2">
                      <Ionicons name="star" size={13} color="#f59e0b" />
                      <Text className="text-xs font-semibold text-gray-700 ml-1">
                        {Number(business.average_rating).toFixed(1)}
                      </Text>
                      {business.total_reviews ? (
                        <Text className="text-xs text-gray-400 ml-0.5">
                          ({business.total_reviews})
                        </Text>
                      ) : null}
                    </View>
                  ) : null}

                  <View className="flex-row items-center flex-1">
                    <Ionicons name="location-outline" size={13} color="#6b7280" />
                    <Text className="text-xs text-gray-500 ml-0.5" numberOfLines={1}>
                      {business.address}
                    </Text>
                  </View>
                </View>

                {business.contactNumber ? (
                  <View className="flex-row items-center mt-1">
                    <Ionicons name="call-outline" size={11} color="#9ca3af" />
                    <Text className="text-xs text-gray-400 ml-1">
                      {business.contactNumber}
                    </Text>
                  </View>
                ) : null}
              </View>

              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default FoodBusinesses;

