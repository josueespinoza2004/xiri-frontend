import { View, Text } from "react-native";
import { MenuItem } from "@/infrastructure/interfaces/menu.interface";
import { Food } from "@/infrastructure/interfaces/gastronomy.interface";

interface Props {
  menu: MenuItem[];
  foods: Food[];
}

const BusinessMenu = ({ menu, foods }: Props) => {
  const getFoodName = (foodId: number): string => {
    return foods.find((f) => f.id === foodId)?.name ?? "Platillo";
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

      {menu.map((item) => (
        <View
          key={item.id}
          className="flex-row justify-between items-center py-3 border-b border-gray-100"
        >
          <Text className="text-base text-gray-700 flex-1" numberOfLines={1}>
            {getFoodName(item.food)}
          </Text>
          <Text className="text-base font-semibold text-blue-700">
            C${item.price.toFixed(2)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default BusinessMenu;
