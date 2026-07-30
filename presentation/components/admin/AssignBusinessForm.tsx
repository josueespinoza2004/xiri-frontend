import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Business } from "@/infrastructure/interfaces/business.interface";

interface Props {
  form: { business: string; suggestedOrder: string };
  businesses: Business[];
  isPending: boolean;
  onChangeField: (field: string, value: string) => void;
  onSubmit: () => void;
}

const AssignBusinessForm = ({
  form,
  businesses,
  isPending,
  onChangeField,
  onSubmit,
}: Props) => {
  return (
    <View className="px-4 mt-4">
      <Text className="text-base font-bold text-gray-800 mb-3">
        Asignar Negocio a Ruta
      </Text>

      <Text className="text-xs text-gray-500 mb-1">
        ID del negocio ({businesses.map((b) => `${b.id}=${b.name}`).join(", ")})
      </Text>
      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base"
        placeholder="ID negocio"
        keyboardType="number-pad"
        value={form.business}
        onChangeText={(v) => onChangeField("business", v)}
      />

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base"
        placeholder="Orden sugerido (1, 2, 3...)"
        keyboardType="number-pad"
        value={form.suggestedOrder}
        onChangeText={(v) => onChangeField("suggestedOrder", v)}
      />

      <TouchableOpacity
        className="bg-blue-600 rounded-lg py-3 items-center"
        onPress={onSubmit}
        disabled={isPending}
      >
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold text-base">Asignar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AssignBusinessForm;
