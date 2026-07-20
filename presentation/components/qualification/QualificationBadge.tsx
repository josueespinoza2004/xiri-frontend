import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  qualification: number;
  comment: string | null;
  creationDate: string;
}

const QualificationBadge = ({ qualification, comment, creationDate }: Props) => {
  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString("es-NI", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <View className="bg-green-50 rounded-lg p-3 mt-3">
      <View className="flex-row items-center">
        <Ionicons name="checkmark-circle" size={16} color="#16a34a" />
        <Text className="text-xs text-green-700 font-medium ml-1">
          Ya calificaste este negocio
        </Text>
      </View>

      <View className="flex-row items-center mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= qualification ? "star" : "star-outline"}
            size={16}
            color={star <= qualification ? "#f59e0b" : "#d1d5db"}
          />
        ))}
        <Text className="text-xs text-gray-500 ml-2">
          {formatDate(creationDate)}
        </Text>
      </View>

      {comment && (
        <Text className="text-xs text-gray-600 mt-2 italic">
          "{comment}"
        </Text>
      )}
    </View>
  );
};

export default QualificationBadge;
