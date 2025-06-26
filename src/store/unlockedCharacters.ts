import { useState, useEffect } from 'react';
import { openPack } from '@/lib/pack';
import { Character } from '@/types/character';

export function useUnlockedCharacters() {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [packsLeft, setPacksLeft] = useState<number>(3);

  useEffect(() => {
    const stored = localStorage.getItem('unlocked');
    const storedPacks = localStorage.getItem('packs');
    if (stored) setUnlockedIds(JSON.parse(stored));
    if (storedPacks) setPacksLeft(Number(storedPacks));
  }, []);

  useEffect(() => {
    localStorage.setItem('unlocked', JSON.stringify(unlockedIds));
    localStorage.setItem('packs', String(packsLeft));
  }, [unlockedIds, packsLeft]);

  return {
    unlockedIds,
    packsLeft,
    openPack: (): { success: boolean; newCharacters: Character[] } => {
      if (packsLeft <= 0) return { success: false, newCharacters: [] };
      const { newCharacters, updatedIds } = openPack(unlockedIds);
      setUnlockedIds(updatedIds);
      setPacksLeft((prev) => prev - 1);
      return { success: true, newCharacters };
    }
  };
}
