import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

interface Props {
  form: {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    contact_number: string;
  };
  isPending: boolean;
  onChangeField: (field: string, value: string) => void;
  onSubmit: () => void;
  onGoToLogin: () => void;
}

export const RegisterForm = ({
  form,
  isPending,
  onChangeField,
  onSubmit,
  onGoToLogin,
}: Props) => {
  return (
    <View className="flex-1 justify-center px-8 bg-white">
      <Text className="text-3xl font-bold text-center text-gray-800 mb-8">
        Crear Cuenta
      </Text>

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
        placeholder="Nombre"
        value={form.first_name}
        onChangeText={(value) => onChangeField("first_name", value)}
      />

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
        placeholder="Apellido"
        value={form.last_name}
        onChangeText={(value) => onChangeField("last_name", value)}
      />

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
        placeholder="Username"
        autoCapitalize="none"
        value={form.username}
        onChangeText={(value) => onChangeField("username", value)}
      />

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(value) => onChangeField("email", value)}
      />

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
        placeholder="Número de contacto"
        keyboardType="phone-pad"
        value={form.contact_number}
        onChangeText={(value) => onChangeField("contact_number", value)}
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
          <Text className="text-white font-semibold text-base">
            Registrarse
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity className="mt-4 items-center" onPress={onGoToLogin}>
        <Text className="text-blue-600 text-sm">
          ¿Ya tenés cuenta? Iniciar sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
};
