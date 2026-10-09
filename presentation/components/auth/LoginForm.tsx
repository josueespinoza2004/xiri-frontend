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
    <KeyboardAware className="flex-1 bg-xiri-cream">
      <View className="flex-1 justify-center px-8">
        <Logo size="lg" />

        <Text className="text-3xl font-bold text-center text-xiri-dark mb-2 mt-4">
          Bienvenido a Xiri
        </Text>
        <Text className="text-sm text-center text-gray-500 mb-8">
          Explorá la gastronomía de Nicaragua
        </Text>

        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base bg-white text-xiri-dark"
          placeholder="Username"
          placeholderTextColor="#9ca3af"
          autoCapitalize="none"
          value={form.username}
          onChangeText={(value) => onChangeField("username", value)}
        />

        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-6 text-base bg-white text-xiri-dark"
          placeholder="Contraseña"
          placeholderTextColor="#9ca3af"
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
            <Text className="text-white font-semibold text-base">Ingresar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity className="mt-4 items-center" onPress={onGoToRegister}>
          <Text className="text-xiri-teal text-sm">
            ¿No tenés cuenta? Registrate
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAware>
  );
};
