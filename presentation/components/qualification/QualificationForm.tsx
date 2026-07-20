import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StarRating from "./StarRating";

interface Props {
  businessName: string;
  rating: number;
  comment: string;
  imageUri: string | null;
  isPending: boolean;
  onRateChange: (value: number) => void;
  onCommentChange: (value: string) => void;
  onPickImage: () => void;
  onSubmit: () => void;
}

const QualificationForm = ({
  businessName,
  rating,
  comment,
  imageUri,
  isPending,
  onRateChange,
  onCommentChange,
  onPickImage,
  onSubmit,
}: Props) => {
  return (
    <View className="px-5 mt-4">
      <Text className="text-lg font-bold text-gray-800 mb-4 pl-8">
        Calificar: {businessName}
      </Text>

      {/* Estrellas */}
      <Text className="text-sm text-gray-500 mb-2">Puntuación</Text>
      <StarRating rating={rating} onRate={onRateChange} />

      {/* Comentario */}
      <Text className="text-sm text-gray-500 mt-4 mb-2">
        Comentario (opcional)
      </Text>
      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 text-base min-h-[80px]"
        placeholder="¿Cómo fue tu experiencia?"
        multiline
        textAlignVertical="top"
        value={comment}
        onChangeText={onCommentChange}
      />

      {/* Imagen de evidencia */}
      <Text className="text-sm text-gray-500 mt-4 mb-2">
        Foto de evidencia
      </Text>
      <TouchableOpacity
        className="border border-dashed border-gray-300 rounded-lg py-4 items-center justify-center"
        onPress={onPickImage}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            className="w-full h-40 rounded-lg"
            resizeMode="cover"
          />
        ) : (
          <View className="items-center">
            <Ionicons name="camera-outline" size={32} color="#9ca3af" />
            <Text className="text-sm text-gray-400 mt-2">Tomar o elegir foto</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Botón enviar */}
      <TouchableOpacity
        className="bg-blue-600 rounded-lg py-3 mt-6 mb-8 items-center"
        onPress={onSubmit}
        disabled={isPending}
      >
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold text-base">
            Enviar calificación
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default QualificationForm;
