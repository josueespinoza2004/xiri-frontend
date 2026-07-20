import { Pressable } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  color?: string;
}

const BackButton = ({ color = "#1f2937" }: Props) => {
  return (
    <Pressable
      className="absolute z-50 top-[45px] left-[16px] w-9 h-9 rounded-full bg-white/80 justify-center items-center"
      onPress={() => router.back()}
    >
      <Ionicons name="arrow-back" size={22} color={color} />
    </Pressable>
  );
};

export default BackButton;
