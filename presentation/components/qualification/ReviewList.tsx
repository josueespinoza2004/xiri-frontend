import { View, Text } from "react-native";
import { Qualification } from "@/infrastructure/interfaces/qualification.interface";
import ReviewCard from "./ReviewCard";

interface Props {
  title: string;
  reviews: Qualification[];
  currentUserId: number | null;
}

const ReviewList = ({ title, reviews, currentUserId }: Props) => {
  return (
    <View className="px-5 mt-6">
      <Text className="text-lg font-bold text-gray-800 mb-3">{title}</Text>

      {reviews.length === 0 ? (
        <Text className="text-sm text-gray-400">
          Aún no hay reseñas para este negocio
        </Text>
      ) : (
        reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            isOwn={review.user === currentUserId}
          />
        ))
      )}
    </View>
  );
};

export default ReviewList;
