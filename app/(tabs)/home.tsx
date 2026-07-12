import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = () => {
  const safeArea = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: safeArea.top }}>
      <Text className="text-3xl font-bold px-4 mt-2">Xiri</Text>
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-500">
          Bienvenido a Xiri
        </Text>
      </View>
    </View>
  );
};

export default HomeScreen;
