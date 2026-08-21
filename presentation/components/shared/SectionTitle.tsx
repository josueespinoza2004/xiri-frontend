import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  onSeeAll?: () => void;
}

const SectionTitle = ({ title, onSeeAll }: Props) => {
  return (
    <View className="flex-row items-center justify-between px-4 mb-3">
      <Text className="text-lg font-bold text-xiri-dark">{title}</Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll}>
          <Text className="text-sm text-xiri-orange font-medium">Ver todo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionTitle;
