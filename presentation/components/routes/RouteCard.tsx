import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  id: number;
  name: string;
  description: string;
  onPress?: () => void;
}

const RouteCard = ({ name, description, onPress }: Props) => {
  return (
    <Pressable
      className="bg-white rounded-2xl p-4 mb-3 mx-4 shadow-sm shadow-black/10 flex-row items-center"
      onPress={onPress}
    >
      <View className="w-10 h-10 rounded-full bg-orange-100 justify-center items-center mr-3">
        <Ionicons name="map-outline" size={22} color="#ea580c" />
      </View>

      <View className="flex-1">
        <Text className="text-base font-bold text-gray-800" numberOfLines={1}>
          {name}
        </Text>
        <Text className="text-xs text-gray-500 mt-1" numberOfLines={2}>
          {description}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    </Pressable>
  );
};

export default RouteCard;
