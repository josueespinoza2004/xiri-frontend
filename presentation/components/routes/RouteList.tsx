import { FlatList, Text, View } from "react-native";
import { GastronomicRoute } from "@/infrastructure/interfaces/route.interface";
import RouteCard from "./RouteCard";

interface Props {
  title: string;
  routes: GastronomicRoute[];
  onPressRoute?: (id: number, name: string) => void;
}

const RouteList = ({ title, routes, onPressRoute }: Props) => {
  return (
    <View className="mt-4">
      <Text className="text-xl font-bold px-4 mb-3">{title}</Text>
      <FlatList
        data={routes}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <RouteCard
            id={item.id}
            name={item.name}
            description={item.description}
            onPress={() => onPressRoute?.(item.id, item.name)}
          />
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-8">
            No hay rutas disponibles
          </Text>
        }
      />
    </View>
  );
};

export default RouteList;
