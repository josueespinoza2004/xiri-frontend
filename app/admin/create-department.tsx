import { useState } from "react";
import { Alert, ScrollView, View } from "react-native"
import KeyboardAware from "@/presentation/components/shared/KeyboardAware";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAdminDepartments } from "@/presentation/hooks/useAdminDepartments";
import DepartmentForm from "@/presentation/components/admin/DepartmentForm";
import BackButton from "@/presentation/components/shared/BackButton";

const CreateDepartmentScreen = () => {
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { createMutation } = useAdminDepartments();

  const [form, setForm] = useState({
    name: "",
    description: "",
    latitude: "",
    longitude: "",
  });

  const handleChangeField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = () => {
    if (!form.name || !form.description || !form.latitude || !form.longitude) {
      Alert.alert("Error", "Todos los campos son requeridos");
      return;
    }

    createMutation.mutate(form, {
      onSuccess: () => {
        Alert.alert("Éxito", "Departamento creado", [
          { text: "OK", onPress: () => router.back() },
        ]);
      },
      onError: (error: any) => {
        const msg = typeof error === "string" ? error : "Error al crear";
        Alert.alert("Error", msg);
      },
    });
  };

  return (
    <KeyboardAware className="bg-white">
      <BackButton />
      <View style={{ paddingTop: safeArea.top }}>
        <DepartmentForm
          form={form}
          isPending={createMutation.isPending}
          onChangeField={handleChangeField}
          onSubmit={handleCreate}
        />
      </View>
    </KeyboardAware>
  );
};

export default CreateDepartmentScreen;
