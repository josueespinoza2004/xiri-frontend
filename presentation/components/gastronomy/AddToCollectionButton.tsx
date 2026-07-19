import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  isInCollection: boolean;
  isPending: boolean;
  onPress: () => void;
}

const AddToCollectionButton = ({ isInCollection, isPending, onPress }: Props) => {
  if (isInCollection) {
    return (
      <TouchableOpacity
        className="mx-5 mt-5 mb-8 bg-green-100 rounded-lg py-3 flex-row items-center justify-center"
        disabled
      >
        <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
        <Text className="text-green-700 font-semibold text-base ml-2">
          Ya en tu colección
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      className="mx-5 mt-5 mb-8 bg-blue-600 rounded-lg py-3 flex-row items-center justify-center"
      onPress={onPress}
      disabled={isPending}
    >
      {isPending ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          <Ionicons name="add-circle-outline" size={20} color="#fff" />
          <Text className="text-white font-semibold text-base ml-2">
            Agregar a mi colección
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default AddToCollectionButton;
