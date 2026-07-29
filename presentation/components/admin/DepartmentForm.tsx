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
}

const DepartmentForm = ({ form, isPending, onChangeField, onSubmit }: Props) => {
  return (
    <View className="px-4 mt-4">
      <Text className="text-base font-bold text-gray-800 mb-3">
        Nuevo Departamento
      </Text>

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base"
        placeholder="Nombre"
        value={form.name}
        onChangeText={(v) => onChangeField("name", v)}
      />

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base"
        placeholder="Descripción"
        multiline
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

export default DepartmentForm;
