import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  firstName: string | null;
  username: string | null;
}

const WelcomeBanner = ({ firstName, username }: Props) => {
  const displayName = firstName || username || "Explorador";

  return (
    <View className="px-4 mb-4">
      <View className="flex-row items-center">
        <Ionicons name="hand-right-outline" size={22} color="#f59e0b" />
        <Text className="text-base text-gray-600 ml-2">
          Hola, {displayName}
        </Text>
      </View>
    </View>
  );
};

export default WelcomeBanner;
