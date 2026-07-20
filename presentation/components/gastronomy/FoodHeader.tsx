import { Image, useWindowDimensions, View } from "react-native";
import BackButton from "@/presentation/components/shared/BackButton";

interface Props {
  image: string;
}

const FoodHeader = ({ image }: Props) => {
  const { height: screenHeight } = useWindowDimensions();

  return (
    <>
      <BackButton color="white" />

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
