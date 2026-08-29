import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AlbumFood } from "@/presentation/hooks/useAlbum";

interface Props {
  food: AlbumFood;
  onPress?: () => void;
}

const AlbumCard = ({ food, onPress }: Props) => {
  return (
    <Pressable className="w-1/3 p-1.5 active:opacity-90" onPress={onPress}>
      <View className="bg-white rounded-2xl overflow-hidden border border-gray-100">
        <View className="relative">
          <Image
            source={{ uri: food.image }}
            style={{
              width: "100%",
              height: 100,
              opacity: food.collected ? 1 : 0.25,
            }}
            resizeMode="cover"
          />
          {!food.collected && (
            <View className="absolute inset-0 justify-center items-center">
              <Ionicons name="lock-closed" size={24} color="#9ca3af" />
            </View>
          )}
          {food.collected && (
            <View className="absolute top-1 right-1 bg-white rounded-full">
              <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
            </View>
          )}
        </View>
        <Text
          className={`text-xs font-medium px-2 py-2 text-center ${
            food.collected ? "text-xiri-dark" : "text-gray-400"
          }`}
          numberOfLines={1}
        >
          {food.name}
        </Text>
      </View>
    </Pressable>
  );
};

export default AlbumCard;
