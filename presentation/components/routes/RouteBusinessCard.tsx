import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Qualification } from "@/infrastructure/interfaces/qualification.interface";

interface Props {
  order: number;
  businessName: string;
  businessAddress: string;
  existingQualification?: Qualification | null;
  onPress?: () => void;
}

const RouteBusinessCard = ({
  order,
  businessName,
  businessAddress,
  existingQualification,
  onPress,
}: Props) => {
  return (
    <Pressable
      className="bg-white rounded-2xl p-4 mb-3 mx-4 shadow-sm shadow-black/10 active:opacity-90"
      onPress={onPress}
    >
      <View className="flex-row items-center">
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

        {existingQualification ? (
          <View className="flex-row items-center">
            <Ionicons name="star" size={14} color="#f59e0b" />
            <Text className="text-sm font-medium text-amber-600 ml-1">
              {existingQualification.qualification}
            </Text>
          </View>
        ) : (
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        )}
      </View>
    </Pressable>
  );
};

export default RouteBusinessCard;
