import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  order: number;
  businessName: string;
  businessAddress: string;
}

const RouteBusinessCard = ({ order, businessName, businessAddress }: Props) => {
  return (
    <View className="bg-white rounded-2xl p-4 mb-3 mx-4 shadow-sm shadow-black/10 flex-row items-center">
      <View className="w-8 h-8 rounded-full bg-blue-100 justify-center items-center mr-3">
        <Text className="text-sm font-bold text-blue-700">{order}</Text>
      </View>

      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800" numberOfLines={1}>
          {businessName}
        </Text>
        <View className="flex-row items-center mt-1">
          <Ionicons name="location-outline" size={14} color="#6b7280" />
          <Text className="text-xs text-gray-500 ml-1" numberOfLines={1}>
            {businessAddress}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RouteBusinessCard;
