import { FlatList, Text, View } from "react-native";
import { Food } from "@/infrastructure/interfaces/gastronomy.interface";
import FoodCard from "./FoodCard";

interface Props {
  title: string;
  foods: Food[];
}

const FoodList = ({ title, foods }: Props) => {
  return (
    <View className="mt-6">
      <Text className="text-xl font-bold px-4 mb-3">{title}</Text>
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <FoodCard
            id={item.id}
            name={item.name}
            image={item.image}
            culturalOrigin={item.culturalOrigin}
          />
        )}
      />
    </View>
  );
};

export default FoodList;
