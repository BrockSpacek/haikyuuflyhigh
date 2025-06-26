export const getRarityColor = (rarity: string): string => {
  switch (rarity) {
    case 'Common':
      return 'text-gray-600';
    case 'Rare':
      return 'text-blue-500';
    case 'Epic':
      return 'text-purple-600';
    case 'Legendary':
      return 'text-yellow-500';
    default:
      return '';
  }
};

export const getTierBadge = (tier: string): string => {
  switch (tier) {
    case 'S':
      return '🔥 S-Tier';
    case 'A':
      return '⚡ A-Tier';
    case 'B':
      return '⭐ B-Tier';
    case 'C':
      return '⬇️ C-Tier';
    default:
      return tier;
  }
};

export const getStatColor = (value: number): string => {
  if (value >= 90) return 'bg-green-500';
  if (value >= 75) return 'bg-yellow-400';
  if (value >= 60) return 'bg-orange-400';
  return 'bg-red-500';
};
