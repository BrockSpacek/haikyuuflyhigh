'use client';

import { Character } from '@/types/character';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getRarityColor } from '@/utils/helpers';

interface Props {
  characters: Character[];
  onClose: () => void;
}

export default function PackOpeningModal({ characters, onClose }: Props) {
  const [revealed, setRevealed] = useState<number>(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setRevealed((prev) => {
        if (prev < characters.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [characters]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex justify-center items-center z-50 backdrop-blur-sm">
      {/* Enhanced Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-purple-500/5 via-blue-500/5 to-purple-500/5 rounded-full blur-2xl animate-spin-slow"></div>
        {/* Additional floating orbs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500/8 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-cyan-500/8 rounded-full blur-2xl animate-float-delayed"></div>
      </div>

      {/* Main Container - Enhanced */}
      <div className="relative bg-gradient-to-br from-slate-800/95 via-slate-900/98 to-slate-800/95 backdrop-blur-2xl rounded-3xl p-10 w-full max-w-6xl shadow-2xl border border-slate-600/30 overflow-hidden">
        
        {/* Enhanced Glowing Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-purple-500/30 rounded-3xl blur-xl -z-10 animate-pulse-slow"></div>
        <div className="absolute inset-px bg-gradient-to-r from-purple-400/20 via-transparent to-blue-400/20 rounded-3xl"></div>
        
        {/* Enhanced Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 group flex items-center justify-center w-12 h-12 bg-gradient-to-br from-slate-700/80 to-slate-800/80 hover:from-red-600/80 hover:to-red-700/80 rounded-full font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl border border-slate-600/50 hover:border-red-500/50 backdrop-blur-sm"
        >
          <span className="text-slate-300 group-hover:text-white transition-colors duration-300">×</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/0 to-red-500/0 group-hover:from-red-500/20 group-hover:to-red-600/20 transition-all duration-300"></div>
        </button>

        {/* Enhanced Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-full blur-3xl"></div>
          <h2 className="text-6xl font-bold bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 bg-clip-text text-transparent mb-6 drop-shadow-2xl relative z-10">
            🏐 Volleyball Pack Opening 🏐
          </h2>
          <p className="text-slate-300 text-2xl font-medium mb-4 relative z-10">Discover your legendary players!</p>
          <div className="mt-6 w-40 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto rounded-full shadow-lg"></div>
          <div className="mt-2 w-20 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto rounded-full"></div>
        </div>

        {/* Cards Container - Bigger Cards */}
        <div className="flex justify-center gap-10 perspective-1000">
          {characters.map((char, i) => (
            <div
              key={char.id}
              className="relative preserve-3d transition-all duration-1000 ease-out"
              style={{
                transform: i <= revealed 
                  ? 'rotateY(0deg) scale(1)' 
                  : 'rotateY(180deg) scale(0.8)',
                transformStyle: 'preserve-3d',
                opacity: i <= revealed ? 1 : 0.3,
              }}
            >
              {/* Card Back - Bigger */}
              <div 
                className="absolute inset-0 w-[220px] h-[340px] backface-hidden rounded-2xl"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <div className="w-full h-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-2xl border-4 border-slate-600 flex flex-col items-center justify-center relative overflow-hidden">
                  {/* Enhanced Animated Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-purple-500/15 to-blue-500/15 animate-pulse"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-shimmer"></div>
                  
                  {/* Logo/Design */}
                  <div className="relative z-10 text-7xl mb-6 animate-bounce-slow">🏐</div>
                  <div className="text-slate-300 font-bold text-xl tracking-wider mb-2">HAIKYUU</div>
                  <div className="text-slate-400 text-base font-medium">TRADING CARD</div>
                  
                  {/* Enhanced Decorative Elements */}
                  <div className="absolute top-6 left-6 w-10 h-10 border-2 border-slate-500/60 rounded-full animate-spin-slow"></div>
                  <div className="absolute top-6 right-6 w-10 h-10 border-2 border-slate-500/60 rounded-full animate-spin-reverse"></div>
                  <div className="absolute bottom-6 left-6 w-10 h-10 border-2 border-slate-500/60 rounded-full animate-spin-slow"></div>
                  <div className="absolute bottom-6 right-6 w-10 h-10 border-2 border-slate-500/60 rounded-full animate-spin-reverse"></div>
                </div>
              </div>

              {/* Card Front - Bigger */}
              <div 
                className="w-[220px] h-[340px] backface-hidden rounded-2xl"
                style={{ transform: 'rotateY(0deg)' }}
              >
                <div className={`w-full h-full rounded-2xl border-4 overflow-hidden relative ${getRarityBorder(char.rarity)} ${getRarityGlow(char.rarity)}`}>
                  {/* Rarity Background Gradient */}
                  <div className={`absolute inset-0 ${getRarityBackground(char.rarity)} opacity-25`}></div>
                  
                  {/* Legendary Special Effects */}
                  {char.rarity === 'Legendary' && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-orange-400/20 animate-legendary-sweep"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-legendary-shimmer"></div>
                      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1)_0%,transparent_50%)] animate-legendary-pulse"></div>
                    </>
                  )}
                  
                  {/* Main Card Content */}
                  <div className="relative z-10 w-full h-full bg-gradient-to-br from-slate-800/95 to-slate-900/95 rounded-xl m-1 p-5 flex flex-col">
                    
                    {/* Tier Badge */}
                    <div className="absolute -top-1 -right-1 z-20">
                      <div className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getTierBadge(char.tier)} shadow-lg`}>
                        {char.tier}
                      </div>
                    </div>

                    {/* Character Image - Bigger */}
                    <div className="flex-1 relative mb-5 rounded-xl overflow-hidden bg-slate-700/50 border border-slate-600/30">
                      <Image
                        src={`/images/${char.image}`}
                        alt={char.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                        onError={(e) => {
                          const target = e.currentTarget;
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) {
                            target.style.display = 'none';
                            fallback.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="w-full h-full bg-slate-700/80 rounded-lg items-center justify-center text-5xl hidden">
                        🏐
                      </div>
                      
                      {/* Enhanced Holographic Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      {char.rarity === 'Legendary' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-orange-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300 animate-legendary-hover"></div>
                      )}
                    </div>

                    {/* Character Info */}
                    <div className="text-center space-y-3">
                      <h3 className="text-white font-bold text-xl leading-tight drop-shadow-sm">
                        {char.name}
                      </h3>
                      <p className="text-slate-300 text-base font-medium">{char.school}</p>
                      <p className="text-slate-400 text-sm">{char.position}</p>
                      
                      {/* Enhanced Rarity Badge */}
                      <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${getRarityBadge(char.rarity)} shadow-lg transform transition-all duration-300 hover:scale-105`}>
                        {char.rarity.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Sparkle Effects */}
                  {char.rarity === 'Legendary' && (
                    <>
                      <div className="absolute top-6 left-6 w-3 h-3 bg-yellow-400 rounded-full animate-legendary-sparkle"></div>
                      <div className="absolute top-12 right-8 w-2 h-2 bg-orange-400 rounded-full animate-legendary-sparkle-delayed"></div>
                      <div className="absolute bottom-8 left-8 w-2 h-2 bg-yellow-300 rounded-full animate-legendary-sparkle-slow"></div>
                      <div className="absolute bottom-16 right-6 w-3 h-3 bg-orange-300 rounded-full animate-legendary-sparkle-fast"></div>
                      <div className="absolute top-1/2 left-4 w-1 h-1 bg-white rounded-full animate-legendary-twinkle"></div>
                      <div className="absolute top-1/3 right-4 w-1 h-1 bg-yellow-200 rounded-full animate-legendary-twinkle-delayed"></div>
                    </>
                  )}
                  {char.rarity === 'Epic' && (
                    <>
                      <div className="absolute top-6 left-6 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                      <div className="absolute top-10 right-8 w-1 h-1 bg-indigo-300 rounded-full animate-pulse delay-300"></div>
                      <div className="absolute bottom-8 left-8 w-1 h-1 bg-purple-300 rounded-full animate-ping delay-700"></div>
                      <div className="absolute bottom-14 right-6 w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-500"></div>
                    </>
                  )}
                  {char.rarity === 'Rare' && (
                    <>
                      <div className="absolute top-6 left-6 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-8 right-6 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-500"></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Progress Indicator */}
        <div className="flex justify-center mt-12 space-x-3">
          {characters.map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all duration-500 ${
                i <= revealed 
                  ? 'bg-gradient-to-r from-orange-400 to-yellow-500 shadow-lg shadow-orange-500/50 transform scale-110' 
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin 15s linear infinite reverse;
        }
        .animate-bounce-slow {
          animation: bounce 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 4s ease-in-out infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 3s;
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        .animate-legendary-sweep {
          animation: legendary-sweep 2s ease-in-out infinite;
        }
        .animate-legendary-shimmer {
          animation: legendary-shimmer 1.5s ease-in-out infinite;
        }
        .animate-legendary-pulse {
          animation: legendary-pulse 2s ease-in-out infinite;
        }
        .animate-legendary-hover {
          animation: legendary-hover 1s ease-in-out infinite;
        }
        .animate-legendary-sparkle {
          animation: legendary-sparkle 1s ease-in-out infinite;
        }
        .animate-legendary-sparkle-delayed {
          animation: legendary-sparkle 1s ease-in-out infinite 0.3s;
        }
        .animate-legendary-sparkle-slow {
          animation: legendary-sparkle 1.5s ease-in-out infinite;
        }
        .animate-legendary-sparkle-fast {
          animation: legendary-sparkle 0.8s ease-in-out infinite;
        }
        .animate-legendary-twinkle {
          animation: legendary-twinkle 0.5s ease-in-out infinite;
        }
        .animate-legendary-twinkle-delayed {
          animation: legendary-twinkle 0.5s ease-in-out infinite 0.2s;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes legendary-sweep {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(300%) rotate(45deg); }
        }
        @keyframes legendary-shimmer {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes legendary-pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        @keyframes legendary-hover {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.5; }
        }
        @keyframes legendary-sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes legendary-twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

function getRarityBorder(rarity: string) {
  switch (rarity) {
    case 'Legendary':
      return 'border-gradient-legendary';
    case 'Epic':
      return 'border-gradient-epic';
    case 'Rare':
      return 'border-gradient-rare';
    case 'Common':
      return 'border-slate-400';
    default:
      return 'border-slate-400';
  }
}

function getRarityGlow(rarity: string) {
  switch (rarity) {
    case 'Legendary':
      return 'shadow-[0_0_40px_rgba(255,215,0,0.8)] hover:shadow-[0_0_60px_rgba(255,215,0,1)]';
    case 'Epic':
      return 'shadow-[0_0_30px_rgba(147,51,234,0.7)] hover:shadow-[0_0_45px_rgba(147,51,234,0.9)]';
    case 'Rare':
      return 'shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:shadow-[0_0_35px_rgba(59,130,246,0.8)]';
    case 'Common':
      return 'shadow-[0_0_20px_rgba(107,114,128,0.4)] hover:shadow-[0_0_25px_rgba(107,114,128,0.6)]';
    default:
      return '';
  }
}

function getRarityBackground(rarity: string) {
  switch (rarity) {
    case 'Legendary':
      return 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500';
    case 'Epic':
      return 'bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-600';
    case 'Rare':
      return 'bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500';
    case 'Common':
      return 'bg-gradient-to-br from-gray-500 via-slate-500 to-gray-600';
    default:
      return 'bg-gradient-to-br from-gray-400 to-gray-600';
  }
}

function getRarityBadge(rarity: string) {
  switch (rarity) {
    case 'Legendary':
      return 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white border border-yellow-400';
    case 'Epic':
      return 'bg-gradient-to-r from-purple-600 to-indigo-700 text-white border border-purple-400';
    case 'Rare':
      return 'bg-gradient-to-r from-blue-600 to-cyan-700 text-white border border-blue-400';
    case 'Common':
      return 'bg-gradient-to-r from-gray-600 to-slate-700 text-white border border-gray-400';
    default:
      return 'bg-gray-500 text-white';
  }
}

function getTierBadge(tier: string) {
  switch (tier) {
    case 'S':
      return 'bg-gradient-to-r from-red-600 to-pink-600 text-white border-red-400';
    case 'A':
      return 'bg-gradient-to-r from-orange-600 to-yellow-600 text-white border-orange-400';
    case 'B':
      return 'bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-400';
    case 'C':
      return 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-blue-400';
    default:
      return 'bg-gray-600 text-white border-gray-400';
  }
}