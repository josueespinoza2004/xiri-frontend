import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Logo from "@/presentation/components/shared/Logo";
import KeyboardAware from "@/presentation/components/shared/KeyboardAware";

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
    <KeyboardAware className="flex-1 bg-xiri-cream">
      <View className="justify-center px-8 py-10">
        <Logo size="md" />

        <Text className="text-3xl font-bold text-center text-xiri-dark mb-2 mt-4">
          Únete a Xiri
        </Text>
        <Text className="text-sm text-center text-gray-500 mb-8">
          Descubrí comidas típicas de todo el país
        </Text>

        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base bg-white"
          placeholder="Nombre"
          value={form.first_name}
          onChangeText={(value) => onChangeField("first_name", value)}
        />

        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base bg-white"
          placeholder="Apellido"
          value={form.last_name}
          onChangeText={(value) => onChangeField("last_name", value)}
        />

        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base bg-white"
          placeholder="Username"
          autoCapitalize="none"
          value={form.username}
          onChangeText={(value) => onChangeField("username", value)}
        />

        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base bg-white"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(value) => onChangeField("email", value)}
        />

        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base bg-white"
          placeholder="Número de contacto"
          keyboardType="phone-pad"
          value={form.contact_number}
          onChangeText={(value) => onChangeField("contact_number", value)}
        />

        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-6 text-base bg-white"
          placeholder="Contraseña"
          secureTextEntry
          value={form.password}
          onChangeText={(value) => onChangeField("password", value)}
        />

        <TouchableOpacity
          className="bg-xiri-teal rounded-lg py-4 items-center"
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
          <Text className="text-xiri-teal text-sm">
            ¿Ya tenés cuenta? Iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAware>
  );
};
