import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

interface Props {
  form: {
    name: string;
    description: string;
    latitude: string;
    longitude: string;
  };
  isPending: boolean;
  onChangeField: (field: string, value: string) => void;
  onSubmit: () => void;
  submitLabel?: string;
}

const DepartmentForm = ({ form, isPending, onChangeField, onSubmit, submitLabel }: Props) => {
  return (
    <View className="px-5 mt-4">
      <Text className="text-xl font-bold text-gray-800 pl-8 mb-6">
        Nuevo Departamento
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

      <View className="flex-row gap-3 mb-3">
        <TextInput
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base"
          placeholder="Latitud"
          keyboardType="decimal-pad"
          value={form.latitude}
          onChangeText={(v) => onChangeField("latitude", v)}
        />
        <TextInput
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base"
          placeholder="Longitud"
          keyboardType="decimal-pad"
          value={form.longitude}
          onChangeText={(v) => onChangeField("longitude", v)}
        />
      </View>

      <TouchableOpacity
        className="bg-xiri-teal rounded-lg py-3 items-center mt-2"
        onPress={onSubmit}
        disabled={isPending}
      >
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold text-base">{submitLabel ?? "Crear"}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DepartmentForm;
