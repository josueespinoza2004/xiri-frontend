import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  collected: number;
  total: number;
}

const AlbumProgress = ({ collected, total }: Props) => {
  const progress = total > 0 ? (collected / total) * 100 : 0;

  return (
    <View className="mx-4 mb-4 bg-xiri-dark rounded-3xl p-5">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <Ionicons name="images-outline" size={20} color="#BDBF09" />
          <Text className="text-base font-bold text-white ml-2">
            Álbum Gastronómico
          </Text>
        </View>
        <Text className="text-lg font-bold text-xiri-olive">
          {collected}/{total}
        </Text>
      </View>

      <View className="h-3 bg-white/20 rounded-full overflow-hidden">
        <View
          className="h-full bg-xiri-olive rounded-full"
          style={{ width: `${progress}%` }}
        />
      </View>

      <Text className="text-xs text-white/70 mt-2">
        {collected === 0
          ? "¡Empezá a coleccionar comidas típicas!"
          : collected === total
            ? "¡Completaste tu álbum! 🎉"
            : `Te faltan ${total - collected} por descubrir`}
      </Text>
    </View>
  );
};

export default AlbumProgress;
