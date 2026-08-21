import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import { useAuthStore } from "@/presentation/hooks/useAuthStore";
import Logo from "@/presentation/components/shared/Logo";

const App = () => {
  const { authState } = useAuthStore();

  if (authState.isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-xiri-cream">
        <Logo size="lg" />
        <ActivityIndicator color="#2292A4" size={30} className="mt-6" />
      </View>
    );
  }

  if (authState.isAuthenticated) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
};

export default App;
