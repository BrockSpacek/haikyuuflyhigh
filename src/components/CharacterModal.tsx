

import { getStatColor } from '@/utils/helpers';
import { Character } from '@/utils/Interface';

interface Props {
  character: Character;
  onClose: () => void;
}

export default function CharacterModal({ character, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-500"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-1">{character.name}</h2>
        <p className="text-sm text-gray-600 mb-2">
          {character.school} • Year {character.year}
        </p>
        <p className="mb-3">{character.position} • {character.rarity} • Tier {character.tier}</p>

        <h3 className="font-semibold mb-1">Stats:</h3>
        <div className="space-y-1">
          {Object.entries(character.stats).map(([key, value]) => (
            <div key={key}>
              <div className="flex justify-between text-sm font-medium">
                <span className="capitalize">{key}</span>
                <span>{value}</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded">
                <div
                  className={`${getStatColor(value)} h-2 rounded`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
