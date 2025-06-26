'use client';

import { useUnlockedCharacters } from '@/store/unlockedCharacters';
import { Character } from '@/types/character';
import characters from '@/utils/characters.json';
import CharacterCard from '@/components/CharacterCard';
import CharacterModal from '@/components/CharacterModal';
import PackOpeningModal from '@/components/PackOpeningModal';
import { useState } from 'react';

export default function HomePage() {
  const { unlockedIds, packsLeft, coins, tryOpenPack } = useUnlockedCharacters();
  const [selected, setSelected] = useState<Character | null>(null);
  const [openingPack, setOpeningPack] = useState<Character[] | null>(null);

  const sortedCharacters: Character[] = [
    ...characters.filter((c) => unlockedIds.includes(c.id)),
    ...characters.filter((c) => !unlockedIds.includes(c.id)),
  ];

  const handleOpenPack = () => {
    const result = tryOpenPack();
    if (result.success) setOpeningPack(result.newCharacters);
    else alert('Not enough packs or coins!');
  };

  const unlockedCount = unlockedIds.length;
  const totalCount = characters.length;
  const collectionPercentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/5 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-60 right-20 w-40 h-40 bg-blue-500/5 rounded-full blur-xl animate-pulse animation-delay-500" />
        <div className="absolute bottom-40 left-1/4 w-28 h-28 bg-purple-500/5 rounded-full blur-xl animate-pulse animation-delay-1000" />
      </div>

      <main className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          {/* Main Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                🏐 <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Haikyuu
                </span> 
                <span className="text-white">Team Builder</span>
              </h1>
              <p className="text-gray-400 text-lg">
                Collect and build your ultimate volleyball team
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  💰
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Coins</p>
                  <p className="text-white font-bold text-lg">{coins.toLocaleString()}</p>
                </div>
              </div>

              <button
                onClick={handleOpenPack}
                className="relative group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 
                         text-white px-6 py-4 rounded-xl font-bold transition-all duration-200 
                         hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 
                         border border-green-500/30"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">📦</span>
                  <div className="text-left">
                    <div className="text-sm">Open Pack</div>
                    <div className="text-xs opacity-90">
                      {packsLeft > 0 ? `${packsLeft} Free Left` : '100 Coins'}
                    </div>
                  </div>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
              </button>
            </div>
          </div>

          {/* Collection Progress */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-semibold flex items-center gap-2">
                📊 Collection Progress
              </h2>
              <span className="text-gray-300 text-sm">
                {unlockedCount}/{totalCount} Characters
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-gray-700 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
                  style={{ width: `${collectionPercentage}%` }}
                />
              </div>
              <span className="text-white font-bold text-lg min-w-[60px]">
                {collectionPercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Filter/Sort Options */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-3 py-2">
            <span className="text-gray-400 text-sm">🔍 Filter:</span>
            <select className="bg-transparent text-white text-sm border-none outline-none">
              <option value="all">All Characters</option>
              <option value="unlocked">Unlocked Only</option>
              <option value="locked">Locked Only</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-3 py-2">
            <span className="text-gray-400 text-sm">⚡ Sort:</span>
            <select className="bg-transparent text-white text-sm border-none outline-none">
              <option value="default">Default</option>
              <option value="rarity">By Rarity</option>
              <option value="tier">By Tier</option>
              <option value="school">By School</option>
            </select>
          </div>

          <div className="ml-auto flex items-center gap-2 text-gray-400 text-sm">
            <span>Showing {sortedCharacters.length} characters</span>
          </div>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sortedCharacters.map((char) => (
            <CharacterCard
              key={char.id}
              character={char}
              locked={!unlockedIds.includes(char.id)}
              onClick={() => setSelected(char)}
            />
          ))}
        </div>

        {/* Empty State */}
        {sortedCharacters.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏐</div>
            <h3 className="text-white text-xl font-bold mb-2">No Characters Found</h3>
            <p className="text-gray-400">Try adjusting your filters or open some packs!</p>
          </div>
        )}

        {/* Modals */}
        {selected && (
          <CharacterModal 
            character={selected} 
            onClose={() => setSelected(null)} 
          />
        )}
        
        {openingPack && (
          <PackOpeningModal 
            characters={openingPack} 
            onClose={() => setOpeningPack(null)} 
          />
        )}
      </main>
    </div>
  );
}