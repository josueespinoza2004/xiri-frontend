import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Qualification } from "@/infrastructure/interfaces/qualification.interface";

interface Props {
  review: Qualification;
  isOwn: boolean;
}

const ReviewCard = ({ review, isOwn }: Props) => {
  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString("es-NI", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <View className="bg-gray-50 rounded-lg p-3 mb-3">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Ionicons name="person-circle-outline" size={18} color="#6b7280" />
          <Text className="text-sm font-medium text-gray-700 ml-1">
            {isOwn ? "Tú" : review.username}
          </Text>
        </View>
        <Text className="text-xs text-gray-400">
          {formatDate(review.creationDate)}
        </Text>
      </View>

      <View className="flex-row items-center mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= review.qualification ? "star" : "star-outline"}
            size={14}
            color={star <= review.qualification ? "#f59e0b" : "#d1d5db"}
          />
        ))}
      </View>

      {review.comment && (
        <Text className="text-sm text-gray-600 mt-2">{review.comment}</Text>
      )}

      {review.evidenceImage && (
        <Image
          source={{ uri: review.evidenceImage }}
          className="w-full h-28 rounded-lg mt-2"
          resizeMode="cover"
        />
      )}
    </View>
  );
};

export default ReviewCard;
