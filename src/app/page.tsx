'use client';

import { useUnlockedCharacters } from '@/store/unlockedCharacters';
import { Character } from '@/types/character';
import allCharacters from '@/utils/characters.json';
import CharacterCard from '@/components/CharacterCard';
import CharacterModal from '@/components/CharacterModal';
import { useState } from 'react';

export default function HomePage() {
  const { unlockedIds, packsLeft, openPack } = useUnlockedCharacters();
  const [selected, setSelected] = useState<Character | null>(null);

  const sortedCharacters: Character[] = [
    ...allCharacters.filter((char) => unlockedIds.includes(char.id)),
    ...allCharacters.filter((char) => !unlockedIds.includes(char.id)),
  ];

  function handleOpenPack() {
    const result = openPack();
    if (result.success) {
      alert(`You pulled: ${result.newCharacters.map((c) => c.name).join(', ')}`);
    } else {
      alert('No packs left!');
    }
  }

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Haikyuu Team Builder</h1>
        <button
          onClick={handleOpenPack}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Open Pack ({packsLeft} left)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCharacters.map((char) => (
          <CharacterCard
            key={char.id}
            character={char}
            locked={!unlockedIds.includes(char.id)}
            onClick={() => setSelected(char)}
          />
        ))}
      </div>

      {selected && <CharacterModal character={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}
