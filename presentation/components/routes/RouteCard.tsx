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
      className="bg-white rounded-2xl p-4 mb-3 flex-row items-center active:opacity-90 border border-gray-100"
      onPress={onPress}
    >
      <View className="w-12 h-12 rounded-full bg-xiri-olive/15 justify-center items-center mr-3">
        <Ionicons name="map" size={22} color="#BDBF09" />
      </View>

      <View className="flex-1">
        <Text className="text-base font-bold text-xiri-dark" numberOfLines={1}>
          {name}
        </Text>
        <Text className="text-xs text-gray-500 mt-1" numberOfLines={2}>
          {description}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#D96C06" />
    </Pressable>
  );
};

export default RouteCard;
