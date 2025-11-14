export const getIntensityColor = (intensity: number) => {
  if (intensity <= 3) return "text-green-600 bg-green-100";
  if (intensity <= 6) return "text-yellow-600 bg-yellow-100";
  if (intensity <= 8) return "text-orange-600 bg-orange-100";
  return "text-red-600 bg-red-100";
};

export const getIntensityLabel = (intensity: number) => {
  if (intensity <= 3) return "Débutant";
  if (intensity <= 6) return "Intermédiaire";
  if (intensity <= 8) return "Avancé";
  return "Expert";
};
