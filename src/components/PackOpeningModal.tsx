'use client';

import { Character } from '@/types/character';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getRarityColor } from '@/utils/helpers';

interface Props {
  allCharacters?: Character[];
  onClose: () => void;
  onCharactersCollected: (characters: Character[]) => void;
}

// Rarity probabilities (out of 100)
const RARITY_CHANCES = {
  Common: 60,    // 60%
  Rare: 25,      // 25%
  Epic: 12,      // 12%
  Legendary: 3   // 3%
};

function generatePackCharacters(allCharacters: Character[] = [], packSize: number = 5): Character[] {
  const pack: Character[] = [];
  
  // If no characters provided, return empty pack
  if (!allCharacters || allCharacters.length === 0) {
    return pack;
  }
  
  for (let i = 0; i < packSize; i++) {
    const roll = Math.random() * 100;
    let selectedRarity = 'Common';
    
    if (roll < RARITY_CHANCES.Legendary) {
      selectedRarity = 'Legendary';
    } else if (roll < RARITY_CHANCES.Legendary + RARITY_CHANCES.Epic) {
      selectedRarity = 'Epic';
    } else if (roll < RARITY_CHANCES.Legendary + RARITY_CHANCES.Epic + RARITY_CHANCES.Rare) {
      selectedRarity = 'Rare';
    }
    
    const availableChars = allCharacters.filter(char => char.rarity === selectedRarity);
    if (availableChars.length === 0) {
      // Fallback to Common if no characters of selected rarity exist
      const fallbackChars = allCharacters.filter(char => char.rarity === 'Common');
      if (fallbackChars.length > 0) {
        const randomChar = fallbackChars[Math.floor(Math.random() * fallbackChars.length)];
        pack.push({
          ...randomChar,
          isDuplicate: pack.some(char => char.id === randomChar.id) || Math.random() > 0.7,
          stars: Math.floor(Math.random() * 5) + 1
        });
      } else {
        // Ultimate fallback - pick any character
        const randomChar = allCharacters[Math.floor(Math.random() * allCharacters.length)];
        pack.push({
          ...randomChar,
          isDuplicate: pack.some(char => char.id === randomChar.id) || Math.random() > 0.7,
          stars: Math.floor(Math.random() * 5) + 1
        });
      }
      continue;
    }
    
    const randomChar = availableChars[Math.floor(Math.random() * availableChars.length)];
    
    // Add duplicate tracking
    const duplicate = pack.some(char => char.id === randomChar.id) || Math.random() > 0.7;
    pack.push({
      ...randomChar,
      isDuplicate: duplicate,
      stars: Math.floor(Math.random() * 5) + 1 // Random stars for demo
    });
  }
  
  return pack;
}

export default function PackOpeningModal({ allCharacters = [], onClose, onCharactersCollected }: Props) {
  const [characters] = useState<Character[]>(() => generatePackCharacters(allCharacters, 5));
  const [revealed, setRevealed] = useState<number>(-1);
  const [showResults, setShowResults] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'opening' | 'revealing' | 'complete'>('opening');

  useEffect(() => {
    // Initial opening animation
    const openingTimer = setTimeout(() => {
      setAnimationPhase('revealing');
    }, 1000);

    return () => clearTimeout(openingTimer);
  }, []);

  useEffect(() => {
    if (animationPhase !== 'revealing') return;

    const interval = setInterval(() => {
      setRevealed((prev) => {
        if (prev < characters.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setShowResults(true);
            setAnimationPhase('complete');
          }, 1000);
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(interval);
  }, [characters.length, animationPhase]);

  const handleClose = () => {
    onCharactersCollected(characters);
    onClose();
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'Legendary':
        return 'border-gradient-legendary shadow-legendary';
      case 'Epic':
        return 'border-gradient-epic shadow-epic';
      case 'Rare':
        return 'border-gradient-rare shadow-rare';
      case 'Common':
        return 'border-gradient-common shadow-common';
      default:
        return 'border-gray-300';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'Legendary':
        return 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500';
      case 'Epic':
        return 'bg-gradient-to-br from-purple-400 via-purple-600 to-indigo-600';
      case 'Rare':
        return 'bg-gradient-to-br from-blue-400 via-blue-600 to-cyan-600';
      case 'Common':
        return 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl mx-4">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 rounded-3xl blur-xl"></div>
        
        {/* Main Container */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-700/50">
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 z-10"
          >
            ✕
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent mb-2">
              🏐 Volleyball Pack Opening 🏐
            </h2>
            <p className="text-slate-300 text-lg">Discover your new volleyball players!</p>
          </div>

          {/* Pack Opening Animation */}
          {animationPhase === 'opening' && (
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-2xl animate-pulse shadow-2xl flex items-center justify-center">
                <span className="text-4xl">📦</span>
              </div>
            </div>
          )}

          {/* Characters Grid */}
          {animationPhase !== 'opening' && (
            <div className="grid grid-cols-5 gap-6 mb-8">
              {characters.map((char, i) => (
                <div
                  key={`${char.id}-${i}`}
                  className={`relative aspect-[3/4] transition-all duration-1000 transform ${
                    i <= revealed ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-8'
                  }`}
                >
                  <div
                    className={`w-full h-full rounded-2xl border-4 overflow-hidden transition-all duration-500 ${
                      i <= revealed ? getRarityGlow(char.rarity) : 'border-slate-600'
                    }`}
                    style={{
                      boxShadow: i <= revealed ? `0 0 30px ${getRarityGlowColor(char.rarity)}` : 'none'
                    }}
                  >
                    {i <= revealed ? (
                      <div className={`w-full h-full ${getRarityBg(char.rarity)} p-1`}>
                        <div className="w-full h-full bg-slate-800 rounded-xl p-3 flex flex-col">
                          {/* Character Image */}
                          <div className="flex-1 relative mb-3">
                            <Image
                              src={`/images/${char.image}`}
                              alt={char.name}
                              width={120}
                              height={120}
                              className="w-full h-full object-cover rounded-lg"
                              onError={(e) => {
                                // Fallback to volleyball emoji if image fails to load
                                const target = e.currentTarget;
                                const fallback = target.nextElementSibling as HTMLElement;
                                if (fallback) {
                                  target.style.display = 'none';
                                  fallback.style.display = 'flex';
                                }
                              }}
                            />
                            <div className="w-full h-full bg-slate-700 rounded-lg items-center justify-center hidden">
                              <span className="text-4xl">🏐</span>
                            </div>
                            
                            {/* Duplicate Badge */}
                            {char.isDuplicate && (
                              <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                                DUP
                              </div>
                            )}
                            
                            {/* Tier Badge */}
                            <div className="absolute -top-1 -left-1 bg-slate-900 text-white text-xs px-2 py-1 rounded-full font-bold border-2 border-slate-600">
                              {char.tier}
                            </div>
                          </div>
                          
                          {/* Character Info */}
                          <div className="text-center">
                            <h3 className="text-white font-bold text-sm mb-1 truncate">{char.name}</h3>
                            <p className="text-slate-300 text-xs mb-1">{char.school}</p>
                            <p className="text-slate-400 text-xs mb-2">{char.position}</p>
                            
                            {/* Stars */}
                            <div className="flex justify-center gap-1 mb-2">
                              {[...Array(5)].map((_, starIndex) => (
                                <span
                                  key={starIndex}
                                  className={`text-sm ${
                                    starIndex < (char.stars || 1) ? 'text-yellow-400' : 'text-slate-600'
                                  }`}
                                >
                                  ⭐
                                </span>
                              ))}
                            </div>
                            
                            {/* Rarity */}
                            <div className={`text-xs font-bold ${getRarityColor(char.rarity)}`}>
                              {char.rarity.toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 animate-pulse rounded-xl flex items-center justify-center">
                        <span className="text-2xl">❓</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results Summary */}
          {showResults && (
            <div className="text-center bg-slate-800/50 rounded-2xl p-6 backdrop-blur-sm border border-slate-700/50">
              <h3 className="text-2xl font-bold text-white mb-4">Pack Summary</h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                {Object.entries(
                  characters.reduce((acc, char) => {
                    acc[char.rarity] = (acc[char.rarity] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([rarity, count]) => (
                  <div key={rarity} className="bg-slate-700/50 rounded-xl p-3">
                    <div className={`text-lg font-bold ${getRarityColor(rarity)}`}>
                      {count}
                    </div>
                    <div className="text-slate-300 text-sm">{rarity}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-slate-300 text-sm">
                <span className="inline-flex items-center gap-2">
                  <span>🏐</span>
                  Duplicates can be used to upgrade your players up to 5 stars!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .shadow-legendary {
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
        }
        .shadow-epic {
          box-shadow: 0 0 20px rgba(147, 51, 234, 0.6);
        }
        .shadow-rare {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
        }
        .shadow-common {
          box-shadow: 0 0 20px rgba(107, 114, 128, 0.4);
        }
        .border-gradient-legendary {
          border-image: linear-gradient(45deg, #ffd700, #ff6b6b) 1;
        }
        .border-gradient-epic {
          border-image: linear-gradient(45deg, #9333ea, #6366f1) 1;
        }
        .border-gradient-rare {
          border-image: linear-gradient(45deg, #3b82f6, #06b6d4) 1;
        }
        .border-gradient-common {
          border-image: linear-gradient(45deg, #6b7280, #9ca3af) 1;
        }
      `}</style>
    </div>
  );
}

function getRarityGlowColor(rarity: string): string {
  switch (rarity) {
    case 'Legendary':
      return 'rgba(255, 215, 0, 0.6)';
    case 'Epic':
      return 'rgba(147, 51, 234, 0.6)';
    case 'Rare':
      return 'rgba(59, 130, 246, 0.6)';
    case 'Common':
      return 'rgba(107, 114, 128, 0.4)';
    default:
      return 'rgba(107, 114, 128, 0.2)';
  }
}