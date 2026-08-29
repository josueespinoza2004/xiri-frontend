export interface Badge {
  id: string;
  label: string;
  description: string;
  icon: string;
  threshold: number;
  unlocked: boolean;
}

export const getBadges = (collected: number): Badge[] => {
  const definitions = [
    {
      id: "first",
      label: "Primera Probada",
      description: "Agregaste tu primera comida",
      icon: "flag",
      threshold: 1,
    },
    {
      id: "explorer",
      label: "Explorador",
      description: "5 comidas probadas",
      icon: "compass",
      threshold: 5,
    },
    {
      id: "gourmet",
      label: "Sibarita",
      description: "10 comidas probadas",
      icon: "restaurant",
      threshold: 10,
    },
    {
      id: "master",
      label: "Maestro Gastronómico",
      description: "20 comidas probadas",
      icon: "trophy",
      threshold: 20,
    },
  ];

  return definitions.map((def) => ({
    ...def,
    unlocked: collected >= def.threshold,
  }));
};
