import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  foodName: string;
  complete: boolean;
  registeredDate: string;
  onPress?: () => void;
}

const CollectionCard = ({ foodName, complete, registeredDate, onPress }: Props) => {
  return (
    <Pressable
      className="bg-white rounded-2xl p-4 mb-3 mx-4 shadow-sm shadow-black/10 flex-row items-center"
      onPress={onPress}
    >
      <View className="w-10 h-10 rounded-full justify-center items-center mr-3"
        style={{ backgroundColor: complete ? "#dcfce7" : "#fef3c7" }}
      >
        <Ionicons
          name={complete ? "checkmark-circle" : "time-outline"}
          size={24}
          color={complete ? "#16a34a" : "#d97706"}
        />
      </View>

      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800" numberOfLines={1}>
          {foodName}
        </Text>
        <Text className="text-xs text-gray-500 mt-1">
          {complete ? "Completada" : "Pendiente"} · {registeredDate}
        </Text>
      </View>
    </Pressable>
  );
};

export default CollectionCard;
