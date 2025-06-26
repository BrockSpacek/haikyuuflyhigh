import { Character } from '@/types/character';
import allCharacters from '@/utils/characters.json';

export function openPack(existing: string[]): { newCharacters: Character[]; updatedIds: string[] } {
  const available = allCharacters.filter(c => !existing.includes(c.id));
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  const pulled = shuffled.slice(0, 3);
  const updatedIds = [...new Set([...existing, ...pulled.map(c => c.id)])];
  return { newCharacters: pulled, updatedIds };
}
