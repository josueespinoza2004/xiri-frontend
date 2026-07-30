import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Department } from "@/infrastructure/interfaces/gastronomy.interface";

interface Props {
  form: { name: string; description: string; department: string };
  departments: Department[];
  isPending: boolean;
  onChangeField: (field: string, value: string) => void;
  onSubmit: () => void;
}

const RouteForm = ({ form, departments, isPending, onChangeField, onSubmit }: Props) => {
  return (
    <View className="px-4 mt-4">
      <Text className="text-base font-bold text-gray-800 mb-3">
        Nueva Ruta Gastronómica
      </Text>

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base"
        placeholder="Nombre de la ruta"
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

      <Text className="text-xs text-gray-500 mb-1">
        ID del departamento ({departments.map((d) => `${d.id}=${d.name}`).join(", ")})
      </Text>
      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base"
        placeholder="ID departamento"
        keyboardType="number-pad"
        value={form.department}
        onChangeText={(v) => onChangeField("department", v)}
      />

      <TouchableOpacity
        className="bg-blue-600 rounded-lg py-3 items-center"
        onPress={onSubmit}
        disabled={isPending}
      >
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold text-base">Crear Ruta</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RouteForm;
