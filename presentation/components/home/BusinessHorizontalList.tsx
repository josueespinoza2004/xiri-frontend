import { FlatList, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Business } from "@/infrastructure/interfaces/business.interface";

interface Props {
  title: string;
  businesses: Business[];
  onPressBusiness?: (business: Business) => void;
}

const BusinessHorizontalList = ({ title, businesses, onPressBusiness }: Props) => {
  return (
    <View className="mt-6">
      <Text className="text-xl font-bold px-4 mb-3">{title}</Text>
      <FlatList
        data={businesses}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <Pressable
            className="mr-3 bg-white rounded-2xl p-3 w-44 shadow-sm shadow-black/10 active:opacity-90"
            onPress={() => onPressBusiness?.(item)}
          >
            <View className="w-8 h-8 rounded-full bg-xiri-teal/20 justify-center items-center mb-2">
              <Ionicons name="storefront-outline" size={18} color="#2292A4" />
            </View>
            <Text className="text-sm font-semibold text-gray-800" numberOfLines={1}>
              {item.name}
            </Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="location-outline" size={12} color="#6b7280" />
              <Text className="text-xs text-gray-500 ml-1" numberOfLines={1}>
                {item.address}
              </Text>
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
