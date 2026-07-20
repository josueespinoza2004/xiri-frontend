import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  rating: number;
  onRate: (value: number) => void;
}

const StarRating = ({ rating, onRate }: Props) => {
  return (
    <View className="flex-row gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Pressable key={star} onPress={() => onRate(star)}>
          <Ionicons
            name={star <= rating ? "star" : "star-outline"}
            size={32}
            color={star <= rating ? "#f59e0b" : "#d1d5db"}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default StarRating;
