import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  businessName: string;
  businessAddress: string;
  idCardNumber: string;
  documentUri: string | null;
  isPending: boolean;
  onChangeField: (field: string, value: string) => void;
  onPickDocument: () => void;
  onSubmit: () => void;
}

const VerificationForm = ({
  businessName,
  businessAddress,
  idCardNumber,
  documentUri,
  isPending,
  onChangeField,
  onPickDocument,
  onSubmit,
}: Props) => {
  return (
    <View className="px-5 mt-4">
      <Text className="text-lg font-bold text-gray-800 mb-2 pl-10">
        Solicitar ser Comerciante
      </Text>
      <Text className="text-sm text-gray-500 mb-6">
        Completá los datos de tu negocio para verificación
      </Text>

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base text-xiri-dark"
        placeholder="Nombre del negocio"
        placeholderTextColor="#9ca3af"
        value={businessName}
        onChangeText={(v) => onChangeField("businessName", v)}
      />

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base text-xiri-dark"
        placeholder="Dirección del negocio"
        placeholderTextColor="#9ca3af"
        value={businessAddress}
        onChangeText={(v) => onChangeField("businessAddress", v)}
      />

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base text-xiri-dark"
        placeholder="Número de cédula"
        placeholderTextColor="#9ca3af"
        value={idCardNumber}
        onChangeText={(v) => onChangeField("idCardNumber", v)}
      />

      <Text className="text-sm text-gray-500 mb-2">
        Foto de documento de identidad
      </Text>
      <TouchableOpacity
        className="border border-dashed border-gray-300 rounded-lg py-4 items-center justify-center mb-6"
        onPress={onPickDocument}
      >
        {documentUri ? (
          <Image
            source={{ uri: documentUri }}
            className="w-full h-40 rounded-lg"
            resizeMode="cover"
          />
        ) : (
          <View className="items-center">
            <Ionicons name="document-outline" size={32} color="#9ca3af" />
            <Text className="text-sm text-gray-400 mt-2">
              Tomar o elegir foto
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-xiri-teal rounded-lg py-3 items-center mb-8"
        onPress={onSubmit}
        disabled={isPending}
      >
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold text-base">
            Enviar solicitud
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default VerificationForm;
