import Image from 'next/image';
import { Character } from '@/types/character';
import { getRarityColor, getTierBadge } from '@/utils/helpers';

interface Props {
  character: Character;
  onClick?: () => void;
  locked: boolean;
}

export default function CharacterCard({ character, onClick, locked }: Props) {
  return (
    <div
      className={`relative bg-white rounded-xl p-4 shadow-md transition-all ${
        locked ? 'opacity-30 grayscale' : 'hover:shadow-xl hover:scale-105 cursor-pointer'
      }`}
      onClick={!locked && onClick ? () => onClick() : undefined}
    >
      <Image
        src={`/images/${character.image}`}
        alt={character.name}
        width={180}
        height={180}
        className="rounded-lg mx-auto"
      />
      {locked && (
        <div className="absolute inset-0 bg-black bg-opacity-60 rounded-xl flex items-center justify-center text-white font-bold text-lg">
          Locked
        </div>
      )}
      <div className="text-center mt-3">
        <h2 className={`text-lg font-bold ${getRarityColor(character.rarity)}`}>{character.name}</h2>
        <p className="text-sm text-gray-500">{character.school}</p>
        <p className="text-sm">{character.position}</p>
        <p className="mt-1 text-xs font-semibold">{getTierBadge(character.tier)}</p>
      </div>
    </div>
  );
}
