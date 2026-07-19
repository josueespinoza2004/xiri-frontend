import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onLogout: () => void;
}

const ProfileCard = ({ onLogout }: Props) => {
  return (
    <View className="flex-1 justify-center items-center px-8 bg-white">
      <View className="w-24 h-24 rounded-full bg-blue-100 justify-center items-center mb-4">
        <Ionicons name="person" size={48} color="#2563eb" />
      </View>

      <Text className="text-2xl font-bold text-gray-800 mb-2">Mi Perfil</Text>

      <TouchableOpacity
        className="mt-8 bg-red-500 rounded-lg py-3 px-8 flex-row items-center"
        onPress={onLogout}
      >
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text className="text-white font-semibold text-base ml-2">
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCard;
