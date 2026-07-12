import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { useRegister } from "@/presentation/hooks/useRegister";
import { RegisterForm } from "@/presentation/components/auth/RegisterForm";

const RegisterScreen = () => {
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

  const handleChangeField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
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

  const handleGoToLogin = () => {
    router.back();
  };

  return (
    <RegisterForm
      form={form}
      isPending={registerMutation.isPending}
      onChangeField={handleChangeField}
      onSubmit={handleSubmit}
      onGoToLogin={handleGoToLogin}
    />
  );
};

export default RegisterScreen;
