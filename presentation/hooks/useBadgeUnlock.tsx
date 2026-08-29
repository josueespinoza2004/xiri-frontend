import { useEffect, useState } from "react";
import { SecureStorage } from "@/config/helpers/secure-storage";
import { Badge } from "@/config/helpers/badges";

export const useBadgeUnlock = (
  badges: Badge[],
  isLoading: boolean,
  userId: number | null,
) => {
  const [newBadge, setNewBadge] = useState<Badge | null>(null);

  useEffect(() => {
    if (isLoading || !userId) return;

    const checkNewBadges = async () => {
      const seen = await SecureStorage.getSeenBadges(userId);
      const unlockedIds = badges.filter((b) => b.unlocked).map((b) => b.id);

      // Buscar la primera insignia desbloqueada que no se ha mostrado
      const freshlyUnlocked = badges.find(
        (b) => b.unlocked && !seen.includes(b.id),
      );

      if (freshlyUnlocked) {
        setNewBadge(freshlyUnlocked);
        // Guardar todas las desbloqueadas como vistas
        await SecureStorage.setSeenBadges(userId, unlockedIds);
      }
    };

    checkNewBadges();
  }, [badges, isLoading, userId]);

  const dismissBadge = () => setNewBadge(null);

  return { newBadge, dismissBadge };
};
