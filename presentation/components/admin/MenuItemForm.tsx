import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Food } from "@/infrastructure/interfaces/gastronomy.interface";
import ChipSelector from "@/presentation/components/shared/ChipSelector";

interface Props {
  form: {
    name: string;
    description: string;
    isTraditionalVariant: boolean;
    traditionalFood: number | null;
  };
  imageUri: string | null;
  foods: Food[];
  isPending: boolean;
  onChangeField: (field: string, value: string | number | boolean) => void;
  onPickImage: () => void;
  onSubmit: () => void;
}

const MenuItemForm = ({
  form,
  imageUri,
  foods,
  isPending,
  onChangeField,
  onPickImage,
  onSubmit,
}: Props) => {
  const foodItems = foods.map((f) => ({
    id: f.id,
    label: f.name,
  }));

  return (
    <View className="px-5 mt-4">
      <Text className="text-xl font-bold text-gray-800 pl-8 mb-6">
        Nuevo Platillo
      </Text>

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base"
        placeholder="Nombre del platillo"
        value={form.name}
        onChangeText={(v) => onChangeField("name", v)}
      />

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base min-h-[80px]"
        placeholder="Descripción"
        multiline
        textAlignVertical="top"
        value={form.description}
        onChangeText={(v) => onChangeField("description", v)}
      />

      {/* Toggle variante tradicional */}
      <View className="flex-row items-center justify-between mb-3 py-2">
        <Text className="text-sm text-gray-700">¿Es variante de comida tradicional?</Text>
        <Switch
          value={form.isTraditionalVariant}
          onValueChange={(v) => onChangeField("isTraditionalVariant", v)}
          trackColor={{ true: "#2563eb" }}
        />
      </View>

      {/* Selector de comida tradicional */}
      {form.isTraditionalVariant && (
        <ChipSelector
          label="Comida Tradicional asociada"
          items={foodItems}
          selectedId={form.traditionalFood}
          onSelect={(id) => onChangeField("traditionalFood", id)}
        />
      )}

      {/* Imagen */}
      <TouchableOpacity
        className="border border-dashed border-gray-300 rounded-lg py-4 items-center justify-center mb-3"
        onPress={onPickImage}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            className="w-full h-32 rounded-lg"
            resizeMode="cover"
          />
        ) : (
          <View className="items-center">
            <Ionicons name="image-outline" size={32} color="#9ca3af" />
            <Text className="text-sm text-gray-400 mt-2">Agregar imagen (opcional)</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-blue-600 rounded-lg py-3 items-center mt-2"
        onPress={onSubmit}
        disabled={isPending}
      >
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold text-base">Crear Platillo</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MenuItemForm;
