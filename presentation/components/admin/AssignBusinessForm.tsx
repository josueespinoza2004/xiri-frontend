import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Business } from "@/infrastructure/interfaces/business.interface";
import ChipSelector from "@/presentation/components/shared/ChipSelector";

interface Props {
  form: { business: number | null; suggestedOrder: string };
  businesses: Business[];
  isPending: boolean;
  onChangeField: (field: string, value: string | number) => void;
  onSubmit: () => void;
}

const AssignBusinessForm = ({
  form,
  businesses,
  isPending,
  onChangeField,
  onSubmit,
}: Props) => {
  const businessItems = businesses.map((b) => ({
    id: b.id,
    label: b.name,
  }));

  return (
    <View className="px-4 mt-4">
      <Text className="text-base font-bold text-gray-800 mb-3">
        Asignar Negocio a Ruta
      </Text>

      <ChipSelector
        label="Negocio"
        items={businessItems}
        selectedId={form.business}
        onSelect={(id) => onChangeField("business", id)}
      />

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-base"
        placeholder="Orden sugerido (1, 2, 3...)"
        keyboardType="number-pad"
        value={form.suggestedOrder}
        onChangeText={(v) => onChangeField("suggestedOrder", v)}
      />

      <TouchableOpacity
        className="bg-xiri-teal rounded-lg py-3 items-center"
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
