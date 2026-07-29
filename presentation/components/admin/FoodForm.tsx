import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Department } from "@/infrastructure/interfaces/gastronomy.interface";

interface Props {
  form: {
    name: string;
    description: string;
    culturalOrigin: string;
    departmentOrigin: string;
  };
  imageUri: string | null;
  departments: Department[];
  isPending: boolean;
  onChangeField: (field: string, value: string) => void;
  onPickImage: () => void;
  onSubmit: () => void;
}

const FoodForm = ({
  form,
  imageUri,
  departments,
  isPending,
  onChangeField,
  onPickImage,
  onSubmit,
}: Props) => {
  return (
    <View className="px-4 mt-4">
      <Text className="text-base font-bold text-gray-800 mb-3">
        Nueva Comida Tradicional
      </Text>

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base"
        placeholder="Nombre"
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

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base"
        placeholder="Origen cultural"
        value={form.culturalOrigin}
        onChangeText={(v) => onChangeField("culturalOrigin", v)}
      />

      {/* Selector de departamento (simple text por ahora) */}
      <Text className="text-xs text-gray-500 mb-1">
        ID del departamento ({departments.map((d) => `${d.id}=${d.name}`).join(", ")})
      </Text>
      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base"
        placeholder="ID departamento"
        keyboardType="number-pad"
        value={form.departmentOrigin}
        onChangeText={(v) => onChangeField("departmentOrigin", v)}
      />

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
            <Text className="text-sm text-gray-400 mt-2">Agregar imagen</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-blue-600 rounded-lg py-3 items-center"
        onPress={onSubmit}
        disabled={isPending}
      >
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold text-base">Crear</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default FoodForm;
