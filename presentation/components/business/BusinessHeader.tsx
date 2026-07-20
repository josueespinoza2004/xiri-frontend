import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  name: string;
  address: string;
  contactNumber: string;
}

const BusinessHeader = ({ name, address, contactNumber }: Props) => {
  return (
    <View className="pl-14 pr-5 mt-4">
      <Text className="text-2xl font-bold text-gray-800">{name}</Text>

      <View className="flex-row items-center mt-3">
        <Ionicons name="location-outline" size={18} color="#6b7280" />
        <Text className="text-base text-gray-600 ml-2">{address}</Text>
      </View>

      <View className="flex-row items-center mt-2">
        <Ionicons name="call-outline" size={18} color="#6b7280" />
        <Text className="text-base text-gray-600 ml-2">{contactNumber}</Text>
      </View>
    </View>
  );
};

export default BusinessHeader;
