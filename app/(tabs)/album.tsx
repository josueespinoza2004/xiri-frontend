import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAlbum } from "@/presentation/hooks/useAlbum";
import { useBadgeUnlock } from "@/presentation/hooks/useBadgeUnlock";
import { getBadges } from "@/config/helpers/badges";
import AlbumProgress from "@/presentation/components/album/AlbumProgress";
import BadgeList from "@/presentation/components/album/BadgeList";
import AlbumCard from "@/presentation/components/album/AlbumCard";
import BadgeUnlockModal from "@/presentation/components/album/BadgeUnlockModal";

const AlbumScreen = () => {
  const safeArea = useSafeAreaInsets();
  const router = useRouter();
  const { isLoading, albumFoods, total, collected } = useAlbum();

  const badges = getBadges(collected);
  const { newBadge, dismissBadge } = useBadgeUnlock(badges, isLoading);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-xiri-cream">
        <ActivityIndicator color="#2292A4" size={50} />
      </View>
    );
  }

  return (
    <>
      <FlatList
        className="bg-xiri-cream"
        data={albumFoods}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 24 }}
        ListHeaderComponent={
          <View style={{ paddingTop: safeArea.top + 8 }}>
            <Text className="text-3xl font-bold px-2 text-xiri-dark mb-4">
              Mi Álbum
            </Text>
            <AlbumProgress collected={collected} total={total} />
            <BadgeList badges={badges} />
            <Text className="text-lg font-bold text-xiri-dark px-2 mb-1">
              Comidas Típicas
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <AlbumCard
            food={item}
            onPress={() => router.push(`/food/${item.id}`)}
          />
        )}
      />

      {/* Modal de logro desbloqueado */}
      <BadgeUnlockModal badge={newBadge} onClose={dismissBadge} />
    </>
  );
};

export default AlbumScreen;
