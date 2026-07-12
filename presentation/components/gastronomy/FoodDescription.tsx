import { Food } from "@/infrastructure/interfaces/gastronomy.interface";
import { Text, View } from "react-native";

interface Props {
  food: Food;
}

const FoodDescription = ({ food }: Props) => {
  return (
    <View className="px-5 mt-5">
      {/* Nombre */}
      <Text className="font-bold text-2xl text-gray-800">{food.name}</Text>

      {/* Origen cultural */}
      <Text className="text-sm text-blue-600 mt-1">{food.culturalOrigin}</Text>

      {/* Descripción */}
      <Text className="font-bold mt-5 text-gray-700">Descripción</Text>
      <Text className="font-normal mt-2 text-gray-600 leading-6">
        {food.description}
      </Text>
    </View>
  );
};

export default FoodDescription;
