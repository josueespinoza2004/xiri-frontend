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
    <Pressable className="active:opacity-90 mr-4 items-center" onPress={onPress}>
      <View className="w-20 h-20 rounded-full overflow-hidden border-2 border-xiri-orange/30">
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>
      <Text className="text-xs font-medium mt-2 text-xiri-dark text-center w-20" numberOfLines={1}>
        {name}
      </Text>
    </Pressable>
  );
};

export default FoodCard;
