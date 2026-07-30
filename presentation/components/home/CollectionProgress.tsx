import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  collected: number;
  total: number;
}

const CollectionProgress = ({ collected, total }: Props) => {
  const progress = total > 0 ? (collected / total) * 100 : 0;

  return (
    <View className="mx-4 mb-6 bg-blue-50 rounded-2xl p-4">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <Ionicons name="trophy-outline" size={20} color="#2563eb" />
          <Text className="text-sm font-semibold text-blue-800 ml-2">
            Álbum Gastronómico
          </Text>
        </View>
        <Text className="text-sm font-bold text-blue-700">
          {collected}/{total}
        </Text>
      </View>

      {/* Barra de progreso */}
      <View className="h-2 bg-blue-200 rounded-full overflow-hidden">
        <View
          className="h-full bg-blue-600 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </View>

      <Text className="text-xs text-blue-600 mt-2">
        {collected === 0
          ? "¡Empezá a coleccionar comidas típicas!"
          : collected === total
            ? "¡Felicidades! Completaste tu álbum 🎉"
            : `Te faltan ${total - collected} comidas por probar`}
      </Text>
    </View>
  );
};

export default CollectionProgress;
