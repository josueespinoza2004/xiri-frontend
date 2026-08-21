import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GastronomicRoute } from "@/infrastructure/interfaces/route.interface";

interface Props {
  route: GastronomicRoute;
}

const RouteHeader = ({ route }: Props) => {
  return (
    <View className="px-4 mb-4">
      <Text className="text-sm text-gray-500 mt-1">{route.description}</Text>

      <View className="flex-row items-center mt-3">
        <Ionicons name="earth-outline" size={16} color="#6b7280" />
        <Text className="text-xs text-gray-400 ml-1">
          {route.departmentName}
        </Text>
      </View>
    </View>
  );
};

export default RouteHeader;
