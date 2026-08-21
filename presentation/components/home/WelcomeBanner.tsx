import { View, Text } from "react-native";
import Logo from "@/presentation/components/shared/Logo";

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
        <Logo size="sm" />
      </View>
    </View>
  );
};

export default WelcomeBanner;
