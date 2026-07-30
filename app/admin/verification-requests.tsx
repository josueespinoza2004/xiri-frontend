import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAdminVerification } from "@/presentation/hooks/useAdminVerification";
import VerificationRequestCard from "@/presentation/components/admin/VerificationRequestCard";
import BackButton from "@/presentation/components/shared/BackButton";

const VerificationRequestsScreen = () => {
  const safeArea = useSafeAreaInsets();
  const { allRequestsQuery, approveMutation, rejectMutation } =
    useAdminVerification();

  if (allRequestsQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#2292A4" size={50} />
      </View>
    );
  }

  const handleApprove = (requestId: number) => {
    Alert.alert("Aprobar", "¿Estás seguro de aprobar esta solicitud?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Aprobar",
        onPress: () => {
          approveMutation.mutate(requestId, {
            onSuccess: () => Alert.alert("Éxito", "Solicitud aprobada"),
            onError: (error: any) => {
              const msg = typeof error === "string" ? error : "Error al aprobar";
              Alert.alert("Error", msg);
            },
          });
        },
      },
    ]);
  };

  const handleReject = (requestId: number) => {
    Alert.prompt(
      "Rechazar solicitud",
      "Escribe el motivo del rechazo:",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Rechazar",
          style: "destructive",
          onPress: (reviews) => {
            rejectMutation.mutate(
              { requestId, reviews: reviews || "Sin motivo" },
              {
                onSuccess: () => Alert.alert("Éxito", "Solicitud rechazada"),
                onError: (error: any) => {
                  const msg = typeof error === "string" ? error : "Error al rechazar";
                  Alert.alert("Error", msg);
                },
              },
            );
          },
        },
      ],
      "plain-text",
    );
  };

  return (
    <ScrollView className="bg-gray-50">
      <BackButton />
      <View className="mt-2" style={{ paddingTop: safeArea.top }}>
        <Text className="text-2xl font-bold pl-14 pr-4 mb-4">
          Solicitudes de Verificación
        </Text>

        <FlatList
          data={allRequestsQuery.data ?? []}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <VerificationRequestCard
              request={item}
              onApprove={() => handleApprove(item.id)}
              onReject={() => handleReject(item.id)}
            />
          )}
          ListEmptyComponent={
            <Text className="text-center text-gray-400 mt-8">
              No hay solicitudes
            </Text>
          }
        />
      </View>
    </ScrollView>
  );
};

export default VerificationRequestsScreen;
