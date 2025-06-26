export interface Stats {
  attack: number;
  block: number;
  serve: number;
  receive: number;
  set: number;
  speed: number;
  jump: number;
  stamina: number;
  technique: number;
  mental: number;
}

export interface Character {
  id: string;
  name: string;
  school: string;
  year: number;
  position: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  tier: 'S' | 'A' | 'B' | 'C';
  image: string;
  stats: Stats;
}
