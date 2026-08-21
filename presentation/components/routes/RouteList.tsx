import { FlatList, View } from "react-native";
import { GastronomicRoute } from "@/infrastructure/interfaces/route.interface";
import RouteCard from "./RouteCard";
import SectionTitle from "@/presentation/components/shared/SectionTitle";

interface Props {
  title: string;
  routes: GastronomicRoute[];
  onPressRoute?: (id: number, name: string) => void;
}

const RouteList = ({ title, routes, onPressRoute }: Props) => {
  return (
    <View className="mt-6">
      <SectionTitle title={title} />
      <FlatList
        data={routes}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <RouteCard
            id={item.id}
            name={item.name}
            description={item.description}
            onPress={() => onPressRoute?.(item.id, item.name)}
          />
        )}
      />
    </View>
  );
};

export default RouteList;
