import { useState, useEffect } from 'react';
import { openPack } from '@/lib/pack';
import { Character } from '@/types/character';

export function useUnlockedCharacters() {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [packsLeft, setPacksLeft] = useState<number>(3);
  const [coins, setCoins] = useState<number>(99999); // Dev mode: unlimited

  useEffect(() => {
    const stored = localStorage.getItem('unlocked');
    const storedPacks = localStorage.getItem('packs');
    const storedCoins = localStorage.getItem('coins');
    if (stored) setUnlockedIds(JSON.parse(stored));
    if (storedPacks) setPacksLeft(Number(storedPacks));
    if (storedCoins) setCoins(Number(storedCoins));
  }, []);

  useEffect(() => {
    localStorage.setItem('unlocked', JSON.stringify(unlockedIds));
    localStorage.setItem('packs', String(packsLeft));
    localStorage.setItem('coins', String(coins));
  }, [unlockedIds, packsLeft, coins]);

  const tryOpenPack = (): { success: boolean; newCharacters: Character[] } => {
    if (packsLeft <= 0 && coins < 100) return { success: false, newCharacters: [] };
    const { newCharacters, updatedIds } = openPack(unlockedIds);
    setUnlockedIds(updatedIds);
    if (packsLeft > 0) setPacksLeft((prev) => prev - 1);
    else setCoins((prev) => prev - 100);
    return { success: true, newCharacters };
  };

  return {
    unlockedIds,
    packsLeft,
    coins,
    tryOpenPack,
  };
}
