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
import { useLogin } from "@/presentation/hooks/useLogin";

export const LoginForm = () => {
  const router = useRouter();
  const { loginMutation } = useLogin();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    if (!form.username || !form.password) {
      Alert.alert("Error", "Username y password son requeridos");
      return;
    }

    loginMutation.mutate(form, {
      onSuccess: (data) => {
        // TODO: guardar tokens (access, refresh) en storage seguro
        console.log("Tokens recibidos:", data);
        Alert.alert("Éxito", "Sesión iniciada correctamente");
      },
      onError: (error: any) => {
        const message =
          typeof error === "string"
            ? error
            : error?.detail || "Credenciales incorrectas";
        Alert.alert("Error al iniciar sesión", message);
      },
    });
  };

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
        onChangeText={(value) => handleChange("username", value)}
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
        onPress={handleLogin}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold text-base">
            Ingresar
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        className="mt-4 items-center"
        onPress={() => router.push("/(auth)/register")}
      >
        <Text className="text-blue-600 text-sm">
          ¿No tenés cuenta? Registrate
        </Text>
      </TouchableOpacity>
    </View>
  );
};
