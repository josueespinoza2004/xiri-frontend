import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAdminRoutes } from "@/presentation/hooks/useAdminRoutes";
import { useAdminDepartments } from "@/presentation/hooks/useAdminDepartments";
import RouteForm from "@/presentation/components/admin/RouteForm";
import BackButton from "@/presentation/components/shared/BackButton";

const CreateRouteScreen = () => {
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { createRouteMutation } = useAdminRoutes();
  const { departmentsQuery } = useAdminDepartments();

  const [form, setForm] = useState({
    name: "",
    description: "",
    department: null as number | null,
  });

  const handleChangeField = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = () => {
    if (!form.name || !form.description || !form.department) {
      Alert.alert("Error", "Todos los campos son requeridos");
      return;
    }

    createRouteMutation.mutate(
      {
        name: form.name,
        description: form.description,
        department: form.department,
      },
      {
        onSuccess: () => {
          Alert.alert("Éxito", "Ruta creada", [
            { text: "OK", onPress: () => router.back() },
          ]);
        },
        onError: (error: any) => {
          const msg = typeof error === "string" ? error : "Error al crear";
          Alert.alert("Error", msg);
        },
      },
    );
  };

  return (
    <ScrollView className="bg-white">
      <BackButton />
      <View style={{ paddingTop: safeArea.top }}>
        <RouteForm
          form={form}
          departments={departmentsQuery.data ?? []}
          isPending={createRouteMutation.isPending}
          onChangeField={handleChangeField}
          onSubmit={handleCreate}
        />
      </View>
    </ScrollView>
  );
};

export default CreateRouteScreen;
