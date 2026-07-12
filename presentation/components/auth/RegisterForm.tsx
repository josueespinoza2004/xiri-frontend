import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useRegister } from "@/presentation/hooks/useRegister";

export const RegisterForm = () => {
  const router = useRouter();
  const { registerMutation } = useRegister();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    contact_number: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Username, email y password son requeridos");
      return;
    }

    registerMutation.mutate(form, {
      onSuccess: (data) => {
        Alert.alert("Éxito", data.mensaje, [
          { text: "OK", onPress: () => router.back() },
        ]);
      },
      onError: (error: any) => {
        const message =
          typeof error === "string"
            ? error
            : Object.values(error).flat().join("\n");
        Alert.alert("Error al registrar", message);
      },
    });
  };

  return (
    <View className="flex-1 justify-center px-8 bg-white">
      <Text className="text-3xl font-bold text-center text-gray-800 mb-8">
        Crear Cuenta
      </Text>

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
        placeholder="Nombre"
        value={form.first_name}
        onChangeText={(value) => handleChange("first_name", value)}
      />

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
        placeholder="Apellido"
        value={form.last_name}
        onChangeText={(value) => handleChange("last_name", value)}
      />

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
        placeholder="Username"
        autoCapitalize="none"
        value={form.username}
        onChangeText={(value) => handleChange("username", value)}
      />

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(value) => handleChange("email", value)}
      />

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
        placeholder="Número de contacto"
        keyboardType="phone-pad"
        value={form.contact_number}
        onChangeText={(value) => handleChange("contact_number", value)}
      />

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-6 text-base"
        placeholder="Contraseña"
        secureTextEntry
        value={form.password}
        onChangeText={(value) => handleChange("password", value)}
      />

      <TouchableOpacity
        className="bg-blue-600 rounded-lg py-4 items-center"
        onPress={handleRegister}
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold text-base">
            Registrarse
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        className="mt-4 items-center"
        onPress={() => router.back()}
      >
        <Text className="text-blue-600 text-sm">
          ¿Ya tenés cuenta? Iniciar sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
};
