import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface ChipItem {
  id: number;
  label: string;
}

interface Props {
  label: string;
  items: ChipItem[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const ChipSelector = ({ label, items, selectedId, onSelect }: Props) => {
  return (
    <View className="mb-3">
      <Text className="text-xs text-gray-500 mb-2">{label}</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={`mr-2 px-4 py-2 rounded-full ${
              selectedId === item.id ? "bg-xiri-teal" : "bg-gray-200"
            }`}
            onPress={() => onSelect(item.id)}
          >
            <Text
              className={`text-sm font-medium ${
                selectedId === item.id ? "text-white" : "text-gray-700"
              }`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ChipSelector;
