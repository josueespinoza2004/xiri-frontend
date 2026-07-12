import { View, Text, Pressable } from "react-native";

interface Props {
  id: number;
  name: string;
  description: string;
  onPress?: () => void;
}

const DepartmentCard = ({ name, description, onPress }: Props) => {
  return (
    <Pressable className="active:opacity-90 mr-4" onPress={onPress}>
      <View className="w-36 h-28 bg-blue-50 rounded-2xl p-3 justify-between">
        <Text className="text-sm font-bold text-gray-800" numberOfLines={1}>
          {name}
        </Text>
        <Text className="text-xs text-gray-500" numberOfLines={2}>
          {description}
        </Text>
      </View>
    </Pressable>
  );
};

export default DepartmentCard;
