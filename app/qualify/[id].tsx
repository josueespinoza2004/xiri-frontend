import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQualification } from "@/presentation/hooks/useQualification";
import QualificationForm from "@/presentation/components/qualification/QualificationForm";

const QualifyScreen = () => {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();
  const safeArea = useSafeAreaInsets();
  const { createMutation } = useQualification();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      const fileName = asset.uri.split("/").pop() ?? "photo.jpg";
      setImage({
        uri: asset.uri,
        name: fileName,
        type: asset.mimeType ?? "image/jpeg",
      });
    }
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert("Error", "Seleccioná una puntuación");
      return;
    }

    if (!image) {
      Alert.alert("Error", "La foto de evidencia es requerida");
      return;
    }

    createMutation.mutate(
      {
        businessId: +id,
        qualification: rating,
        comment: comment || undefined,
        evidenceImage: image,
      },
      {
        onSuccess: () => {
          Alert.alert("Éxito", "Calificación enviada", [
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

  return (
    <ScrollView className="bg-white">
      <View style={{ paddingTop: safeArea.top }}>
        <QualificationForm
          businessName={(name as string) ?? "Negocio"}
          rating={rating}
          comment={comment}
          imageUri={image?.uri ?? null}
          isPending={createMutation.isPending}
          onRateChange={setRating}
          onCommentChange={setComment}
          onPickImage={handlePickImage}
          onSubmit={handleSubmit}
        />
      </View>
    </ScrollView>
  );
};

export default QualifyScreen;
