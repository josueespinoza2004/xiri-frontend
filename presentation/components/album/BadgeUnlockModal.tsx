import { Modal, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ConfettiCannon from "react-native-confetti-cannon";
import { Badge } from "@/config/helpers/badges";

interface Props {
  badge: Badge | null;
  onClose: () => void;
}

const { width } = Dimensions.get("window");

const BadgeUnlockModal = ({ badge, onClose }: Props) => {
  if (!badge) return null;

  return (
    <Modal transparent visible={!!badge} animationType="fade">
      <View className="flex-1 bg-black/60 justify-center items-center px-8">
        {/* Confetti */}
        <ConfettiCannon
          count={120}
          origin={{ x: width / 2, y: 0 }}
          fadeOut
          autoStart
          colors={["#053225", "#2292A4", "#BDBF09", "#D96C06"]}
        />

        {/* Card de celebración */}
        <View className="bg-white rounded-3xl p-6 items-center w-full">
          <Text className="text-sm font-medium text-xiri-orange mb-3">
            ¡Logro Desbloqueado!
          </Text>

          <View className="w-24 h-24 rounded-full bg-xiri-olive justify-center items-center mb-4">
            <Ionicons name={badge.icon as any} size={48} color="#fff" />
          </View>

          <Text className="text-2xl font-bold text-xiri-dark text-center">
            {badge.label}
          </Text>
          <Text className="text-sm text-gray-500 text-center mt-1">
            {badge.description}
          </Text>

          <TouchableOpacity
            className="bg-xiri-teal rounded-lg py-3 px-10 mt-6"
            onPress={onClose}
          >
            <Text className="text-white font-semibold text-base">
              ¡Genial!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default BadgeUnlockModal;
