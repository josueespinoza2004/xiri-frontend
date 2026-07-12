import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import { useAuthStore } from "@/presentation/hooks/useAuthStore";

const App = () => {
  const { authState } = useAuthStore();

  if (authState.isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator color="#2563eb" size={40} />
      </View>
    );
  }

  if (authState.isAuthenticated) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
};

export default App;
