import { View, Text, Image, Pressable } from "react-native";

interface Props {
  id: number;
  name: string;
  image: string;
  culturalOrigin: string;
  onPress?: () => void;
}

const FoodCard = ({ name, image, culturalOrigin, onPress }: Props) => {
  return (
    <Pressable className="active:opacity-90 mr-4" onPress={onPress}>
      <View className="w-40">
        <Image
          source={{ uri: image }}
          className="w-40 h-40 rounded-2xl"
          resizeMode="cover"
        />
        <Text className="text-sm font-semibold mt-2 text-gray-800" numberOfLines={1}>
          {name}
        </Text>
        <Text className="text-xs text-gray-500" numberOfLines={1}>
          {culturalOrigin}
        </Text>
      </View>
    </Pressable>
  );
};

export default FoodCard;
