import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

interface Props {
  form: { username: string; password: string };
  isPending: boolean;
  onChangeField: (field: string, value: string) => void;
  onSubmit: () => void;
  onGoToRegister: () => void;
}

export const LoginForm = ({
  form,
  isPending,
  onChangeField,
  onSubmit,
  onGoToRegister,
}: Props) => {
  return (
    <View className="flex-1 justify-center px-8 bg-white">
      <Text className="text-3xl font-bold text-center text-gray-800 mb-8">
        Iniciar Sesión
      </Text>

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
        placeholder="Username"
        autoCapitalize="none"
        value={form.username}
        onChangeText={(value) => onChangeField("username", value)}
      />

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-6 text-base"
        placeholder="Contraseña"
        secureTextEntry
        value={form.password}
        onChangeText={(value) => onChangeField("password", value)}
      />

      <TouchableOpacity
        className="bg-blue-600 rounded-lg py-4 items-center"
        onPress={onSubmit}
        disabled={isPending}
      >
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold text-base">Ingresar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity className="mt-4 items-center" onPress={onGoToRegister}>
        <Text className="text-blue-600 text-sm">
          ¿No tenés cuenta? Registrate
        </Text>
      </TouchableOpacity>
    </View>
  );
};
