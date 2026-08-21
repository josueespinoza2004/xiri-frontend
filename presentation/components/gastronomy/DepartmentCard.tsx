import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  id: number;
  name: string;
  description: string;
  onPress?: () => void;
}

const DepartmentCard = ({ name, description, onPress }: Props) => {
  return (
    <Pressable className="active:opacity-90 mr-3" onPress={onPress}>
      <View className="w-36 h-28 bg-xiri-dark rounded-2xl p-3 justify-between">
        <Ionicons name="earth-outline" size={20} color="#2292A4" />
        <View>
          <Text className="text-sm font-bold text-white" numberOfLines={1}>
            {name}
          </Text>
          <Text className="text-xs text-white/60" numberOfLines={1}>
            {description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default DepartmentCard;
