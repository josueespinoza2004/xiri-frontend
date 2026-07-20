import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Qualification } from "@/infrastructure/interfaces/qualification.interface";
import QualificationBadge from "@/presentation/components/qualification/QualificationBadge";

interface Props {
  order: number;
  businessName: string;
  businessAddress: string;
  existingQualification?: Qualification | null;
  onQualify?: () => void;
}

const RouteBusinessCard = ({
  order,
  businessName,
  businessAddress,
  existingQualification,
  onQualify,
}: Props) => {
  return (
    <View className="bg-white rounded-2xl p-4 mb-3 mx-4 shadow-sm shadow-black/10">
      <View className="flex-row items-center">
        <View className="w-8 h-8 rounded-full bg-blue-100 justify-center items-center mr-3">
          <Text className="text-sm font-bold text-blue-700">{order}</Text>
        </View>

        <View className="flex-1">
          <Text className="text-base font-semibold text-gray-800" numberOfLines={1}>
            {businessName}
          </Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="location-outline" size={14} color="#6b7280" />
            <Text className="text-xs text-gray-500 ml-1" numberOfLines={1}>
              {businessAddress}
            </Text>
          </View>
        </View>
      </View>

      {existingQualification ? (
        <QualificationBadge
          qualification={existingQualification.qualification}
          comment={existingQualification.comment}
          creationDate={existingQualification.creationDate}
        />
      ) : (
        <TouchableOpacity
          className="flex-row items-center justify-center bg-amber-50 rounded-lg py-2 mt-3"
          onPress={onQualify}
        >
          <Ionicons name="star-outline" size={16} color="#d97706" />
          <Text className="text-xs text-amber-700 ml-1 font-medium">
            Calificar
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RouteBusinessCard;
