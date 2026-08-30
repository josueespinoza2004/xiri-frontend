import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { VerificationRequest } from "@/infrastructure/interfaces/verification.interface";

interface Props {
  request: VerificationRequest;
  onApprove?: () => void;
  onReject?: () => void;
}

const stateConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "Pendiente", color: "#d97706", bg: "#fef3c7" },
  pendiente: { label: "Pendiente", color: "#d97706", bg: "#fef3c7" },
  approved: { label: "Aprobada", color: "#16a34a", bg: "#dcfce7" },
  denied: { label: "Rechazada", color: "#dc2626", bg: "#fee2e2" },
  denegated: { label: "Rechazada", color: "#dc2626", bg: "#fee2e2" },
};

const isPending = (state: string) =>
  state === "pending" || state === "pendiente";

const isDenied = (state: string) =>
  state === "denied" || state === "denegated";

const VerificationRequestCard = ({ request, onApprove, onReject }: Props) => {
  const config = stateConfig[request.state] ?? stateConfig.pending;

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString("es-NI", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <View className="bg-white rounded-2xl p-4 mb-3 mx-4 shadow-sm shadow-black/10">
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Ionicons name="person-circle-outline" size={20} color="#6b7280" />
          <Text className="text-sm font-medium text-gray-700 ml-1">
            {request.username}
          </Text>
        </View>
        <View className="px-2 py-1 rounded-full" style={{ backgroundColor: config.bg }}>
          <Text className="text-xs font-medium" style={{ color: config.color }}>
            {config.label}
          </Text>
        </View>
      </View>

      {/* Info */}
      <Text className="text-base font-bold text-gray-800 mt-3">
        {request.businessName}
      </Text>
      <Text className="text-sm text-gray-500 mt-1">{request.businessAddress}</Text>
      <Text className="text-xs text-gray-400 mt-1">
        Cédula: {request.idCardNumber} · {formatDate(request.requestDate)}
      </Text>

      {/* Documento */}
      {request.identityDocument && (
        <Image
          source={{ uri: request.identityDocument }}
          className="w-full h-32 rounded-lg mt-3"
          resizeMode="cover"
        />
      )}

      {/* Acciones (solo si pendiente) */}
      {isPending(request.state) && (
        <View className="flex-row gap-3 mt-4">
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center bg-green-50 py-2 rounded-lg"
            onPress={onApprove}
          >
            <Ionicons name="checkmark" size={18} color="#16a34a" />
            <Text className="text-sm text-green-700 font-medium ml-1">
              Aprobar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center bg-red-50 py-2 rounded-lg"
            onPress={onReject}
          >
            <Ionicons name="close" size={18} color="#dc2626" />
            <Text className="text-sm text-red-600 font-medium ml-1">
              Rechazar
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Reviews si rechazada */}
      {isDenied(request.state) && request.reviews && (
        <Text className="text-xs text-gray-600 mt-3 italic">
          Motivo: "{request.reviews}"
        </Text>
      )}
    </View>
  );
};

export default VerificationRequestCard;
