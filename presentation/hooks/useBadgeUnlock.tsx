import { useEffect, useState } from "react";
import { SecureStorage } from "@/config/helpers/secure-storage";
import { Badge } from "@/config/helpers/badges";

export const useBadgeUnlock = (badges: Badge[], isLoading: boolean) => {
  const [newBadge, setNewBadge] = useState<Badge | null>(null);

  useEffect(() => {
    if (isLoading) return;

    const checkNewBadges = async () => {
      const seen = await SecureStorage.getSeenBadges();
      const unlockedIds = badges.filter((b) => b.unlocked).map((b) => b.id);

      // Buscar la primera insignia desbloqueada que no se ha mostrado
      const freshlyUnlocked = badges.find(
        (b) => b.unlocked && !seen.includes(b.id),
      );

      if (freshlyUnlocked) {
        setNewBadge(freshlyUnlocked);
        // Guardar todas las desbloqueadas como vistas
        await SecureStorage.setSeenBadges(unlockedIds);
      }
    };

    checkNewBadges();
  }, [badges, isLoading]);

  const dismissBadge = () => setNewBadge(null);

  return { newBadge, dismissBadge };
};
