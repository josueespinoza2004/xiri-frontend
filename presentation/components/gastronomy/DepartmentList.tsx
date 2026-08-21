import { FlatList, View } from "react-native";
import { router } from "expo-router";
import { Department } from "@/infrastructure/interfaces/gastronomy.interface";
import DepartmentCard from "./DepartmentCard";
import SectionTitle from "@/presentation/components/shared/SectionTitle";

interface Props {
  title: string;
  departments: Department[];
}

const DepartmentList = ({ title, departments }: Props) => {
  return (
    <View className="mt-6">
      <SectionTitle title={title} />
      <FlatList
        data={departments}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <DepartmentCard
            id={item.id}
            name={item.name}
            description={item.description}
            onPress={() =>
              router.push(`/department/${item.id}?name=${item.name}`)
            }
          />
        )}
      />
    </View>
  );
};

export default DepartmentList;
