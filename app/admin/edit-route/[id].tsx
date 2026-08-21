import { useState } from "react";
import { Alert, ScrollView, View } from "react-native"
import KeyboardAware from "@/presentation/components/shared/KeyboardAware";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAdminRoutes } from "@/presentation/hooks/useAdminRoutes";
import { useAdminDepartments } from "@/presentation/hooks/useAdminDepartments";
import RouteForm from "@/presentation/components/admin/RouteForm";
import BackButton from "@/presentation/components/shared/BackButton";

const EditRouteScreen = () => {
  const { id, name, description, department } = useLocalSearchParams();
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { updateRouteMutation } = useAdminRoutes();
  const { departmentsQuery } = useAdminDepartments();

  const [form, setForm] = useState({
    name: (name as string) ?? "",
    description: (description as string) ?? "",
    department: department ? +department : null,
  });

  const handleChangeField = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = () => {
    if (!form.name || !form.description || !form.department) {
      Alert.alert("Error", "Todos los campos son requeridos");
      return;
    }

    updateRouteMutation.mutate(
      {
        id: +id,
        name: form.name,
        description: form.description,
        department: form.department,
      },
      {
        onSuccess: () => {
          Alert.alert("Éxito", "Ruta actualizada", [
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
        <RouteForm
          form={form}
          departments={departmentsQuery.data ?? []}
          isPending={updateRouteMutation.isPending}
          onChangeField={handleChangeField}
          onSubmit={handleUpdate}
          submitLabel="Guardar Cambios"
        />
      </View>
    </KeyboardAware>
  );
};

export default EditRouteScreen;
