'use client';

import Image from 'next/image';
import { Character } from '@/utils/Interface';
import { getRarityColor, getTierBadge } from '@/utils/helpers';

interface Props {
  character: Character;
  onClick: (char: Character) => void;
}

export default function CharacterCard({ character, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(character)}
      className="cursor-pointer bg-white rounded-xl p-4 shadow-md hover:shadow-xl hover:scale-105 transition-all"
    >
      <Image
        src={`/images/${character.image}`}
        alt={character.name}
        width={180}
        height={180}
        className="rounded-lg mx-auto"
      />
      <div className="text-center mt-3">
        <h2 className={`text-lg font-bold ${getRarityColor(character.rarity)}`}>{character.name}</h2>
        <p className="text-sm text-gray-500">{character.school}</p>
        <p className="text-sm">{character.position}</p>
        <p className="mt-1 text-xs font-semibold">{getTierBadge(character.tier)}</p>
      </div>
    </div>
  );
}
