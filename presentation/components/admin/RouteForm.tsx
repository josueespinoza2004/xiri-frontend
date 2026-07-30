import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Department } from "@/infrastructure/interfaces/gastronomy.interface";
import ChipSelector from "@/presentation/components/shared/ChipSelector";

interface Props {
  form: { name: string; description: string; department: number | null };
  departments: Department[];
  isPending: boolean;
  onChangeField: (field: string, value: string | number) => void;
  onSubmit: () => void;
}

const RouteForm = ({ form, departments, isPending, onChangeField, onSubmit }: Props) => {
  const departmentItems = departments.map((d) => ({
    id: d.id,
    label: d.name,
  }));

  return (
    <View className="px-5 mt-4">
      <Text className="text-xl font-bold text-gray-800 pl-8 mb-6">
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

      <ChipSelector
        label="Departamento"
        items={departmentItems}
        selectedId={form.department}
        onSelect={(id) => onChangeField("department", id)}
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
