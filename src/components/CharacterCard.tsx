import Image from 'next/image';
import { Character } from '@/types/character';
import { getRarityColor, getTierBadge } from '@/utils/helpers';

interface Props {
  character: Character;
  onClick?: () => void;
  locked: boolean;
}

export default function CharacterCard({ character, onClick, locked }: Props) {
  const getRarityGradient = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'legendary':
        return 'from-yellow-400 to-orange-500';
      case 'epic':
        return 'from-purple-500 to-pink-500';
      case 'rare':
        return 'from-blue-500 to-cyan-500';
      case 'common':
        return 'from-gray-500 to-gray-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'legendary':
        return 'border-yellow-400 shadow-yellow-400/30';
      case 'epic':
        return 'border-purple-500 shadow-purple-500/30';
      case 'rare':
        return 'border-blue-500 shadow-blue-500/30';
      case 'common':
        return 'border-gray-500 shadow-gray-500/30';
      default:
        return 'border-gray-500 shadow-gray-500/30';
    }
  };

  return (
    <div
      className={`relative w-48 ${
        locked ? 'opacity-60 grayscale' : 'cursor-pointer hover:scale-105'
      } transition-all duration-200`}
      onClick={!locked && onClick ? () => onClick() : undefined}
    >
      {/* Main Card */}
      <div className={`
        bg-gray-900 rounded-xl border-2 ${getRarityBorder(character.rarity)}
        overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200
      `}>
        
        {/* Header */}
        <div className={`bg-gradient-to-r ${getRarityGradient(character.rarity)} px-3 py-2`}>
          <h3 className="text-white font-bold text-sm text-center truncate">
            {character.name}
          </h3>
        </div>

        {/* Image Container */}
        <div className="relative bg-gray-800 p-2">
          <div className="relative w-full aspect-square bg-gray-700 rounded-lg overflow-hidden">
            <Image
              src={`/images/${character.image}`}
              alt={character.name}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 192px"
            />
            
            {/* Tier Badge - Top Right */}
            <div className="absolute top-1 right-1">
              <div className={`
                bg-gradient-to-r ${getRarityGradient(character.rarity)}
                px-2 py-1 rounded text-xs font-bold text-white
              `}>
                T{character.tier}
              </div>
            </div>

            {/* Rarity Indicator - Top Left */}
            <div className="absolute top-1 left-1">
              <div className={`
                w-3 h-3 rounded-full bg-gradient-to-br ${getRarityGradient(character.rarity)}
                border border-white/50
              `} />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-3 bg-gray-850">
          <div className="space-y-1">
            <p className="text-gray-300 text-xs font-medium">
              {character.school}
            </p>
            <p className="text-white text-sm font-semibold">
              {character.position}
            </p>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold ${getRarityColor(character.rarity)}`}>
                {character.rarity.toUpperCase()}
              </span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-xs text-gray-400">
                  {Math.round(Object.values(character.stats).reduce((a, b) => a + b, 0) / Object.keys(character.stats).length)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Locked Overlay */}
        {locked && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl mb-1">🔒</div>
              <div className="text-white font-bold text-sm">LOCKED</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}