import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { User } from "@/infrastructure/interfaces/auth.interface";
import ProfileRow from "./ProfileRow";

interface Props {
  user: User;
  onLogout: () => void;
}

const rolLabels: Record<string, string> = {
  user: "Explorador",
  owner: "Comerciante",
  admin: "Administrador",
  auditor: "Auditor",
};

const ProfileCard = ({ user, onLogout }: Props) => {
  return (
    <View className="flex-1 bg-white px-6">
      {/* Avatar + nombre */}
      <View className="items-center mt-10">
        <View className="w-24 h-24 rounded-full bg-blue-100 justify-center items-center">
          <Ionicons name="person" size={48} color="#2563eb" />
        </View>

        <Text className="text-2xl font-bold text-gray-800 mt-4">
          {user.firstName || user.lastName
            ? `${user.firstName} ${user.lastName}`.trim()
            : user.username}
        </Text>

        <View className="bg-blue-50 px-3 py-1 rounded-full mt-2">
          <Text className="text-sm text-blue-700 font-medium">
            {rolLabels[user.rol] ?? user.rol}
          </Text>
        </View>
      </View>

      {/* Info del usuario */}
      <View className="mt-8">
        <ProfileRow icon="person-outline" label="Username" value={user.username} />
        <ProfileRow icon="mail-outline" label="Email" value={user.email} />
        <ProfileRow icon="call-outline" label="Contacto" value={user.contactNumber || "No registrado"} />
        <ProfileRow icon="globe-outline" label="País" value={user.country} />
      </View>

      {/* Logout */}
      <TouchableOpacity
        className="mt-10 bg-red-500 rounded-lg py-3 flex-row items-center justify-center"
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
