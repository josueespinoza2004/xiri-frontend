import { View, Text, Image } from "react-native";
import { MenuItem } from "@/infrastructure/interfaces/menu.interface";
import { Food } from "@/infrastructure/interfaces/gastronomy.interface";

interface Props {
  menu: MenuItem[];
  foods: Food[];
}

const BusinessMenu = ({ menu, foods }: Props) => {
  const getFood = (foodId: number): Food | undefined => {
    return foods.find((f) => f.id === foodId);
  };

  if (menu.length === 0) {
    return (
      <View className="px-5 mt-6">
        <Text className="text-lg font-bold text-gray-800 mb-2">Menú</Text>
        <Text className="text-sm text-gray-400">
          Este negocio aún no tiene menú registrado
        </Text>
      </View>
    );
  }

  return (
    <View className="px-5 mt-6">
      <Text className="text-lg font-bold text-gray-800 mb-3">Menú</Text>

      {menu.map((item) => {
        const food = getFood(item.food);

        return (
          <View
            key={item.id}
            className="flex-row items-center py-3 border-b border-gray-100"
          >
            {food?.image ? (
              <Image
                source={{ uri: food.image }}
                className="w-12 h-12 rounded-lg mr-3"
                resizeMode="cover"
              />
            ) : (
              <View className="w-12 h-12 rounded-lg mr-3 bg-gray-100 justify-center items-center">
                <Text className="text-lg">🍽️</Text>
              </View>
            )}

            <View className="flex-1">
              <Text className="text-base text-gray-700" numberOfLines={1}>
                {food?.name ?? "Platillo"}
              </Text>
              {food?.culturalOrigin && (
                <Text className="text-xs text-gray-400" numberOfLines={1}>
                  {food.culturalOrigin}
                </Text>
              )}
            </View>

            <Text className="text-base font-semibold text-blue-700">
              C${item.price.toFixed(2)}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default BusinessMenu;
