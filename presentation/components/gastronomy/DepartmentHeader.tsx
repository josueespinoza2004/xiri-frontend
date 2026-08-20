import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Department } from "@/infrastructure/interfaces/gastronomy.interface";

interface Props {
  department: Department;
}

const DepartmentHeader = ({ department }: Props) => {
  return (
    <View className="px-5 mb-4">
      <Text className="text-sm text-gray-500 mt-2">{department.description}</Text>

      <View className="flex-row items-center mt-3">
        <Ionicons name="location-outline" size={16} color="#6b7280" />
        <Text className="text-xs text-gray-400 ml-1">
          {department.latitude.toFixed(4)}, {department.longitude.toFixed(4)}
        </Text>
      </View>
    </View>
  );
};

export default DepartmentHeader;
