import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Badge } from "@/config/helpers/badges";

interface Props {
  badges: Badge[];
}

const BadgeList = ({ badges }: Props) => {
  return (
    <View className="mt-2 mb-4">
      <Text className="text-lg font-bold text-xiri-dark px-4 mb-3">Insignias</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {badges.map((badge) => (
          <View key={badge.id} className="items-center mr-4 w-20">
            <View
              className="w-16 h-16 rounded-full justify-center items-center"
              style={{
                backgroundColor: badge.unlocked ? "#BDBF09" : "#e5e7eb",
              }}
            >
              <Ionicons
                name={badge.icon as any}
                size={28}
                color={badge.unlocked ? "#fff" : "#9ca3af"}
              />
            </View>
            <Text
              className={`text-xs font-medium text-center mt-1 ${
                badge.unlocked ? "text-xiri-dark" : "text-gray-400"
              }`}
              numberOfLines={2}
            >
              {badge.label}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default BadgeList;
