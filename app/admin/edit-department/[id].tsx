import { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native"
import KeyboardAware from "@/presentation/components/shared/KeyboardAware";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAdminDepartments } from "@/presentation/hooks/useAdminDepartments";
import DepartmentForm from "@/presentation/components/admin/DepartmentForm";
import BackButton from "@/presentation/components/shared/BackButton";

const EditDepartmentScreen = () => {
  const { id, name, description, latitude, longitude } = useLocalSearchParams();
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { updateMutation } = useAdminDepartments();

  const [form, setForm] = useState({
    name: (name as string) ?? "",
    description: (description as string) ?? "",
    latitude: (latitude as string) ?? "",
    longitude: (longitude as string) ?? "",
  });

  const handleChangeField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = () => {
    if (!form.name || !form.description || !form.latitude || !form.longitude) {
      Alert.alert("Error", "Todos los campos son requeridos");
      return;
    }

    updateMutation.mutate(
      { id: +id, ...form },
      {
        onSuccess: () => {
          Alert.alert("Éxito", "Departamento actualizado", [
            { text: "OK", onPress: () => router.back() },
          ]);
        },
        onError: (error: any) => {
          const msg = typeof error === "string" ? error : "Error al actualizar";
          Alert.alert("Error", msg);
        },
      },
    );
  };

  return (
    <KeyboardAware className="bg-xiri-cream">
      <BackButton />
      <View style={{ paddingTop: safeArea.top }}>
        <DepartmentForm
          form={form}
          isPending={updateMutation.isPending}
          onChangeField={handleChangeField}
          onSubmit={handleUpdate}
          submitLabel="Guardar Cambios"
        />
      </View>
    </KeyboardAware>
  );
};

export default EditDepartmentScreen;
