import { Image, View } from "react-native";

interface Props {
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { width: 80, height: 80 },
  md: { width: 120, height: 120 },
  lg: { width: 180, height: 180 },
};

const Logo = ({ size = "md" }: Props) => {
  const dimensions = sizeMap[size];

  return (
    <View className="items-center">
      <Image
        source={require("@/assets/images/logo.png")}
        style={dimensions}
        resizeMode="contain"
      />
    </View>
  );
};

export default Logo;
