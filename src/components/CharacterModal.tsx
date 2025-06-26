import { Character } from '@/types/character';
import RadarChartStats from '@/components/RadarChatStats';
import { getStatColor } from '@/utils/helpers';
import Image from 'next/image';

interface Props {
  character: Character;
  onClose: () => void;
}

export default function CharacterModal({ character, onClose }: Props) {
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

  const totalStats = Object.values(character.stats).reduce((a, b) => a + b, 0);
  const avgStat = Math.round(totalStats / Object.keys(character.stats).length);

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl border-2 border-gray-700 w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className={`bg-gradient-to-r ${getRarityGradient(character.rarity)} p-4 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white font-bold transition-colors"
          >
            ×
          </button>
          
          <div className="pr-12">
            <h2 className="text-white text-2xl font-bold mb-1">{character.name}</h2>
            <div className="flex items-center gap-3 text-white/90 text-sm">
              <span>{character.school}</span>
              <span>•</span>
              <span>Year {character.year}</span>
              <span>•</span>
              <span>{character.position}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row overflow-y-auto max-h-[calc(90vh-120px)]">
          
          {/* Left: Character Image */}
          <div className="md:w-2/5 p-6 bg-gray-800 flex flex-col">
            <div className={`relative p-1 bg-gradient-to-br ${getRarityGradient(character.rarity)} rounded-xl mb-4`}>
              <div className="relative aspect-square bg-gray-700 rounded-lg overflow-hidden">
                <Image
                  src={`/images/${character.image}`}
                  alt={character.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
            </div>

            {/* Quick Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <span className="text-gray-300 text-sm">Rarity</span>
                <span className="text-white font-bold">{character.rarity.toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <span className="text-gray-300 text-sm">Tier</span>
                <span className="text-white font-bold">{character.tier}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <span className="text-gray-300 text-sm">Overall</span>
                <span className={`font-bold text-lg bg-gradient-to-r ${getRarityGradient(character.rarity)} bg-clip-text text-transparent`}>
                  {avgStat}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="md:w-3/5 p-6 bg-gray-850">
            
            {/* Radar Chart */}
            <div className="mb-6">
              <h3 className="text-white text-lg font-bold mb-3">Performance Overview</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <RadarChartStats character={character} />
              </div>
            </div>

            {/* Detailed Stats */}
            <div>
              <h3 className="text-white text-lg font-bold mb-3">Detailed Stats</h3>
              <div className="space-y-2">
                {Object.entries(character.stats).map(([key, value]) => (
                  <div key={key} className="bg-gray-800 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium capitalize">{key}</span>
                      <span className="text-white font-bold">{value}</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getStatColor(value)} transition-all duration-500 ease-out`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}