import { FlatList, View } from "react-native";
import { router } from "expo-router";
import { Food } from "@/infrastructure/interfaces/gastronomy.interface";
import FoodCard from "./FoodCard";
import SectionTitle from "@/presentation/components/shared/SectionTitle";

interface Props {
  title: string;
  foods: Food[];
}

const FoodList = ({ title, foods }: Props) => {
  return (
    <View className="mt-6">
      <SectionTitle title={title} />
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
            onPress={() => router.push(`/food/${item.id}`)}
          />
        )}
      />
    </View>
  );
};

export default FoodList;
