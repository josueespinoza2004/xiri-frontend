import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useProfile } from "@/presentation/hooks/useProfile";
import { useAuthStore } from "@/presentation/hooks/useAuthStore";
import ProfileCard from "@/presentation/components/profile/ProfileCard";

const ProfileScreen = () => {
  const router = useRouter();
  const safeArea = useSafeAreaInsets();
  const { profileQuery } = useProfile();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  if (profileQuery.isLoading || !profileQuery.data) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator color="#2563eb" size={40} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: safeArea.top }}>
      <ProfileCard user={profileQuery.data} onLogout={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
