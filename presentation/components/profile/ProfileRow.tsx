import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

const ProfileRow = ({ icon, label, value }: Props) => {
  return (
    <View className="flex-row items-center py-3 border-b border-gray-100">
      <Ionicons name={icon} size={20} color="#6b7280" />
      <View className="ml-3 flex-1">
        <Text className="text-xs text-gray-400">{label}</Text>
        <Text className="text-base text-gray-800">{value}</Text>
      </View>
    </View>
  );
};

export default ProfileRow;
