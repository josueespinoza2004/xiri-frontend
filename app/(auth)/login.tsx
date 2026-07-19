import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { useLogin } from "@/presentation/hooks/useLogin";
import { useAuthStore } from "@/presentation/hooks/useAuthStore";
import { LoginForm } from "@/presentation/components/auth/LoginForm";

const LoginScreen = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { loginMutation } = useLogin();
  const { login } = useAuthStore();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChangeField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.username || !form.password) {
      Alert.alert("Error", "Username y password son requeridos");
      return;
    }

    loginMutation.mutate(form, {
      onSuccess: async (data) => {
        await login(data.access, data.refresh);
        queryClient.clear();
        router.replace("/(tabs)/home");
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

  const handleGoToRegister = () => {
    router.push("/(auth)/register");
  };

  return (
    <LoginForm
      form={form}
      isPending={loginMutation.isPending}
      onChangeField={handleChangeField}
      onSubmit={handleSubmit}
      onGoToRegister={handleGoToRegister}
    />
  );
};

export default LoginScreen;
