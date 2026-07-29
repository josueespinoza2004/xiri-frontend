import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { VerificationRequest } from "@/infrastructure/interfaces/verification.interface";

interface Props {
  request: VerificationRequest;
}

const stateConfig: Record<string, { icon: string; color: string; bg: string }> = {
  pending: { icon: "time-outline", color: "#d97706", bg: "#fef3c7" },
  approved: { icon: "checkmark-circle", color: "#16a34a", bg: "#dcfce7" },
  denied: { icon: "close-circle", color: "#dc2626", bg: "#fee2e2" },
};

const RequestStatusCard = ({ request }: Props) => {
  const config = stateConfig[request.state] ?? stateConfig.pending;

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString("es-NI", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <View
      className="rounded-lg p-4 mb-3 mx-4"
      style={{ backgroundColor: config.bg }}
    >
      <View className="flex-row items-center">
        <Ionicons name={config.icon as any} size={20} color={config.color} />
        <Text className="text-sm font-medium ml-2" style={{ color: config.color }}>
          {request.state === "pending" && "Solicitud pendiente"}
          {request.state === "approved" && "Solicitud aprobada"}
          {request.state === "denied" && "Solicitud rechazada"}
        </Text>
      </View>

      <Text className="text-base font-semibold text-gray-800 mt-2">
        {request.businessName}
      </Text>
      <Text className="text-xs text-gray-500 mt-1">
        {request.businessAddress} · {formatDate(request.requestDate)}
      </Text>

      {request.reviews && (
        <Text className="text-xs text-gray-600 mt-2 italic">
          Motivo: "{request.reviews}"
        </Text>
      )}
    </View>
  );
};

export default RequestStatusCard;
