import { useState } from "react";
import { ActivityIndicator, Alert, FlatList, ScrollView, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useVerification } from "@/presentation/hooks/useVerification";
import VerificationForm from "@/presentation/components/verification/VerificationForm";
import RequestStatusCard from "@/presentation/components/verification/RequestStatusCard";
import BackButton from "@/presentation/components/shared/BackButton";

const VerificationRequestScreen = () => {
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { requestsQuery, createMutation } = useVerification();

  const [form, setForm] = useState({
    businessName: "",
    businessAddress: "",
    idCardNumber: "",
  });

  const [document, setDocument] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);

  const handleChangeField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePickDocument = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      const fileName = asset.uri.split("/").pop() ?? "document.jpg";
      setDocument({
        uri: asset.uri,
        name: fileName,
        type: asset.mimeType ?? "image/jpeg",
      });
    }
  };

  const handleSubmit = () => {
    if (!form.businessName || !form.businessAddress || !form.idCardNumber) {
      Alert.alert("Error", "Todos los campos son requeridos");
      return;
    }

    if (!document) {
      Alert.alert("Error", "La foto del documento es requerida");
      return;
    }

    createMutation.mutate(
      {
        businessName: form.businessName,
        businessAddress: form.businessAddress,
        idCardNumber: form.idCardNumber,
        identityDocument: document,
      },
      {
        onSuccess: () => {
          Alert.alert("Éxito", "Solicitud enviada correctamente", [
            { text: "OK", onPress: () => router.back() },
          ]);
        },
        onError: (error: any) => {
          const message =
            typeof error === "string" ? error : "No se pudo enviar";
          Alert.alert("Error", message);
        },
      },
    );
  };

  if (requestsQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#2563eb" size={40} />
      </View>
    );
  }

  const hasPendingRequest = requestsQuery.data?.some(
    (r) => r.state === "pending",
  );

  return (
    <ScrollView className="bg-white">
      <BackButton />
      <View style={{ paddingTop: safeArea.top }}>
        {/* Solicitudes existentes */}
        {requestsQuery.data && requestsQuery.data.length > 0 && (
          <View className="mt-4">
            <Text className="text-lg font-bold px-5 mb-3">Mis Solicitudes</Text>
            <FlatList
              data={requestsQuery.data}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => <RequestStatusCard request={item} />}
            />
          </View>
        )}

        {/* Formulario solo si no hay solicitud pendiente */}
        {!hasPendingRequest && (
          <VerificationForm
            businessName={form.businessName}
            businessAddress={form.businessAddress}
            idCardNumber={form.idCardNumber}
            documentUri={document?.uri ?? null}
            isPending={createMutation.isPending}
            onChangeField={handleChangeField}
            onPickDocument={handlePickDocument}
            onSubmit={handleSubmit}
          />
        )}

        {hasPendingRequest && (
          <Text className="text-center text-gray-400 mt-4 px-5">
            Ya tenés una solicitud pendiente. Esperá a que sea revisada.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default VerificationRequestScreen;
