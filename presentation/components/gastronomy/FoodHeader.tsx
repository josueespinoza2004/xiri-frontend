import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, useWindowDimensions, View } from "react-native";

interface Props {
  image: string;
}

const FoodHeader = ({ image }: Props) => {
  const { height: screenHeight } = useWindowDimensions();

  return (
    <>
      {/* Flecha de regreso */}
      <View
        style={{
          position: "absolute",
          zIndex: 99,
          elevation: 9,
          top: 35,
          left: 10,
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </Pressable>
      </View>

      {/* Imagen de la comida */}
      <View
        style={{ height: screenHeight * 0.45 }}
        className="shadow-xl shadow-black/20"
      >
        <View className="flex-1 rounded-b-[25px] overflow-hidden">
          <Image
            source={{ uri: image }}
            resizeMode="cover"
            className="flex-1"
          />
        </View>
      </View>
    </>
  );
};

export default FoodHeader;
