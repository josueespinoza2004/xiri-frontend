import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  name: string;
  address: string;
  contactNumber: string;
  ownerName?: string;
  latitude?: number | null;
  longitude?: number | null;
}

const BusinessHeader = ({
  name,
  address,
  contactNumber,
  ownerName,
  latitude,
  longitude,
}: Props) => {
  return (
    <View className="pl-14 pr-5 mt-4">
      <Text className="text-2xl font-bold text-gray-800">{name}</Text>

      {ownerName && (
        <View className="flex-row items-center mt-2">
          <Ionicons name="person-outline" size={16} color="#6b7280" />
          <Text className="text-sm text-gray-500 ml-2">{ownerName}</Text>
        </View>
      )}

      <View className="flex-row items-center mt-2">
        <Ionicons name="location-outline" size={18} color="#6b7280" />
        <Text className="text-base text-gray-600 ml-2">{address}</Text>
      </View>

      {contactNumber && (
        <View className="flex-row items-center mt-2">
          <Ionicons name="call-outline" size={18} color="#6b7280" />
          <Text className="text-base text-gray-600 ml-2">{contactNumber}</Text>
        </View>
      )}

      {latitude && longitude && (
        <View className="flex-row items-center mt-2">
          <Ionicons name="navigate-outline" size={16} color="#6b7280" />
          <Text className="text-xs text-gray-400 ml-2">
            {latitude.toFixed(4)}, {longitude.toFixed(4)}
          </Text>
        </View>
      )}
    </View>
  );
};

export default BusinessHeader;
