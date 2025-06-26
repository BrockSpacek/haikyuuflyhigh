'use client';

import { useEffect, useState } from 'react';
import CharacterCard from '@/components/CharacterCard';
import CharacterModal from '@/components/CharacterModal';
import characterData from '@/utils/characters.json';
import { Character } from '@/utils/Interface';

export default function HomePage() {
  const [selected, setSelected] = useState<Character | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    setCharacters(characterData);
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Haikyuu Team Builder</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((char: Character) => (
          <CharacterCard key={char.id} character={char} onClick={setSelected} />
        ))}
      </div>

      {selected && <CharacterModal character={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}

