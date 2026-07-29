import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  foodName: string;
  foodImage: string | null;
  complete: boolean;
  registeredDate: string;
  onPress?: () => void;
  onComplete?: () => void;
  onRemove?: () => void;
}

const CollectionCard = ({
  foodName,
  foodImage,
  complete,
  registeredDate,
  onPress,
  onComplete,
  onRemove,
}: Props) => {
  return (
    <Pressable
      className="bg-white rounded-2xl p-4 mb-3 mx-4 shadow-sm shadow-black/10"
      onPress={onPress}
    >
      <View className="flex-row items-center">
        {foodImage ? (
          <Image
            source={{ uri: foodImage }}
            className="w-12 h-12 rounded-lg mr-3"
            resizeMode="cover"
          />
        ) : (
          <View
            className="w-12 h-12 rounded-lg justify-center items-center mr-3"
            style={{ backgroundColor: complete ? "#dcfce7" : "#fef3c7" }}
          >
            <Ionicons
              name={complete ? "checkmark-circle" : "time-outline"}
              size={24}
              color={complete ? "#16a34a" : "#d97706"}
            />
          </View>
        )}

        <View className="flex-1">
          <Text className="text-base font-semibold text-gray-800" numberOfLines={1}>
            {foodName}
          </Text>
          <Text className="text-xs text-gray-500 mt-1">
            {complete ? "Completada" : "Pendiente"} · {registeredDate}
          </Text>
        </View>
      </View>

      {/* Acciones */}
      <View className="flex-row justify-end mt-3 gap-3">
        {!complete && (
          <TouchableOpacity
            className="flex-row items-center bg-green-50 px-3 py-2 rounded-lg"
            onPress={onComplete}
          >
            <Ionicons name="checkmark" size={16} color="#16a34a" />
            <Text className="text-xs text-green-700 ml-1 font-medium">
              Probada
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          className="flex-row items-center bg-red-50 px-3 py-2 rounded-lg"
          onPress={onRemove}
        >
          <Ionicons name="trash-outline" size={16} color="#dc2626" />
          <Text className="text-xs text-red-600 ml-1 font-medium">
            Eliminar
          </Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default CollectionCard;
