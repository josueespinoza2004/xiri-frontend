import { useRouter } from "expo-router";
import { useAuthStore } from "@/presentation/hooks/useAuthStore";
import ProfileCard from "@/presentation/components/profile/ProfileCard";

const ProfileScreen = () => {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  return <ProfileCard onLogout={handleLogout} />;
};

export default ProfileScreen;
