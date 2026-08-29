import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Business } from "@/infrastructure/interfaces/business.interface";

interface Props {
  business: Business;
  onPress?: () => void;
}

const MyBusinessCard = ({ business, onPress }: Props) => {
  const isProfileComplete =
    !!business.contactNumber && business.latitude !== null;

  return (
    <Pressable
      className="bg-white rounded-2xl p-4 mb-3 mx-4 shadow-sm shadow-black/10 active:opacity-90 border border-gray-100"
      onPress={onPress}
    >
      <View className="flex-row items-center">
        <View className="w-10 h-10 rounded-full bg-xiri-orange/15 justify-center items-center mr-3">
          <Ionicons name="storefront" size={20} color="#D96C06" />
        </View>
        <View className="flex-1">
          <Text className="text-base font-bold text-xiri-dark">
            {business.name}
          </Text>
          <Text className="text-xs text-gray-500 mt-1" numberOfLines={1}>
            {business.address}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#D96C06" />
      </View>

      {/* Estado del perfil */}
      <View className="flex-row items-center mt-3">
        <Ionicons
          name={isProfileComplete ? "checkmark-circle" : "alert-circle"}
          size={14}
          color={isProfileComplete ? "#16a34a" : "#d97706"}
        />
        <Text
          className="text-xs ml-1"
          style={{ color: isProfileComplete ? "#16a34a" : "#d97706" }}
        >
          {isProfileComplete ? "Perfil completo" : "Perfil incompleto"}
        </Text>
      </View>
    </Pressable>
  );
};

export default MyBusinessCard;
