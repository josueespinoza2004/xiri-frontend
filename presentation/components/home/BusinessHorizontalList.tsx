import { FlatList, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Business } from "@/infrastructure/interfaces/business.interface";
import SectionTitle from "@/presentation/components/shared/SectionTitle";

interface Props {
  title: string;
  businesses: Business[];
  onPressBusiness?: (business: Business) => void;
}

const BusinessHorizontalList = ({ title, businesses, onPressBusiness }: Props) => {
  return (
    <View className="mt-6">
      <SectionTitle title={title} />
      <FlatList
        data={businesses}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <Pressable
            className="mr-3 bg-white rounded-2xl p-4 w-48 shadow-sm shadow-black/10 active:opacity-90 border border-gray-100"
            onPress={() => onPressBusiness?.(item)}
          >
            <View className="w-10 h-10 rounded-full bg-xiri-orange/15 justify-center items-center mb-3">
              <Ionicons name="storefront" size={20} color="#D96C06" />
            </View>
            <Text className="text-sm font-bold text-xiri-dark" numberOfLines={1}>
              {item.name}
            </Text>
            {item.average_rating ? (
              <View className="flex-row items-center mt-1">
                <Ionicons name="star" size={12} color="#f59e0b" />
                <Text className="text-xs font-semibold text-gray-700 ml-1">
                  {Number(item.average_rating).toFixed(1)}
                </Text>
                {item.total_reviews ? (
                  <Text className="text-xs text-gray-400 ml-1">
                    ({item.total_reviews})
                  </Text>
                ) : null}
              </View>
            ) : null}
            <View className="flex-row items-center mt-2">
              <Ionicons name="location-outline" size={12} color="#6b7280" />
              <Text className="text-xs text-gray-500 ml-1" numberOfLines={1}>
                {item.address}
              </Text>
            </View>
            <View className="mt-3 bg-xiri-teal/10 rounded-full py-1 px-3 self-start">
              <Text className="text-xs text-xiri-teal font-medium">Ver detalles</Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text className="text-sm text-gray-400">No hay negocios disponibles</Text>
        }
      />
    </View>
  );
};

export default BusinessHorizontalList;
