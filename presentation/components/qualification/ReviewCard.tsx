import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Qualification } from "@/infrastructure/interfaces/qualification.interface";

interface Props {
  review: Qualification;
}

const ReviewCard = ({ review }: Props) => {
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
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name={star <= review.qualification ? "star" : "star-outline"}
              size={14}
              color={star <= review.qualification ? "#f59e0b" : "#d1d5db"}
            />
          ))}
        </View>
        <Text className="text-xs text-gray-400">
          {formatDate(review.creationDate)}
        </Text>
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
