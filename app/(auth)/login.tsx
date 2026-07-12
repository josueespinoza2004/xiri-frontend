import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { useLogin } from "@/presentation/hooks/useLogin";
import { LoginForm } from "@/presentation/components/auth/LoginForm";

const LoginScreen = () => {
  const router = useRouter();
  const { loginMutation } = useLogin();

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
