import { View, Text, Image } from "react-native";

interface Props {
  firstName: string | null;
  username: string | null;
}

const WelcomeBanner = ({ firstName, username }: Props) => {
  const displayName = firstName || username || "Explorador";

  return (
    <View className="mx-4 mb-4 bg-xiri-orange rounded-3xl px-5 py-5">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-xl font-bold text-white">
            Hola, {displayName}
          </Text>
          <Text className="text-sm text-white/80 mt-1">
            ¿Qué vamos a explorar hoy?
          </Text>
        </View>
        <Image
          source={require("@/assets/images/logo.png")}
          style={{ width: 60, height: 60 }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default WelcomeBanner;
