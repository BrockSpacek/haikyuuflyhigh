"use client"
import React, { useState, useEffect } from 'react';
import { RotateCcw, Play, Pause } from 'lucide-react';

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

export interface Player {
  id: string;
  name: string;
  stats: Stats;
  position: number; // 1-6 for court positions
}

export interface Team {
  name: string;
  players: Player[];
  score: number;
  serving: boolean;
}

// Sample team data with actual character names
const createSampleTeam = (teamName: string, isHome: boolean): Team => {
  let players: Player[] = [];
  
  if (teamName === "Karasuno") {
    players = [
      {
        id: "karasuno-1",
        name: "Kageyama Tobio",
        stats: { attack: 70, block: 65, serve: 85, receive: 70, set: 95, speed: 75, jump: 70, stamina: 80, technique: 90, mental: 75 },
        position: 1
      },
      {
        id: "karasuno-2",
        name: "Nishinoya Yu",
        stats: { attack: 35, block: 40, serve: 70, receive: 98, set: 55, speed: 90, jump: 60, stamina: 95, technique: 85, mental: 90 },
        position: 2
      },
      {
        id: "karasuno-3",
        name: "Hinata Shoyo",
        stats: { attack: 80, block: 60, serve: 65, receive: 70, set: 45, speed: 95, jump: 99, stamina: 85, technique: 65, mental: 80 },
        position: 3
      },
      {
        id: "karasuno-4",
        name: "Tsukishima Kei",
        stats: { attack: 75, block: 95, serve: 75, receive: 60, set: 60, speed: 65, jump: 85, stamina: 70, technique: 85, mental: 85 },
        position: 4
      },
      {
        id: "karasuno-5",
        name: "Asahi Azumane",
        stats: { attack: 92, block: 75, serve: 80, receive: 70, set: 50, speed: 65, jump: 80, stamina: 75, technique: 80, mental: 65 },
        position: 5
      },
      {
        id: "karasuno-6",
        name: "Daichi Sawamura",
        stats: { attack: 70, block: 70, serve: 75, receive: 85, set: 65, speed: 70, jump: 70, stamina: 90, technique: 80, mental: 95 },
        position: 6
      },
      {
        id: "karasuno-7",
        name: "Tanaka Ryunosuke",
        stats: { attack: 85, block: 65, serve: 75, receive: 75, set: 50, speed: 75, jump: 75, stamina: 85, technique: 70, mental: 80 },
        position: 7
      }
    ];
  } else {
    players = [
      {
        id: "aoba-1",
        name: "Oikawa Tooru",
        stats: { attack: 80, block: 65, serve: 95, receive: 75, set: 98, speed: 75, jump: 75, stamina: 80, technique: 95, mental: 90 },
        position: 1
      },
      {
        id: "aoba-2",
        name: "Watari Shinji",
        stats: { attack: 40, block: 45, serve: 70, receive: 90, set: 60, speed: 85, jump: 55, stamina: 90, technique: 80, mental: 80 },
        position: 2
      },
      {
        id: "aoba-3",
        name: "Iwaizumi Hajime",
        stats: { attack: 90, block: 75, serve: 80, receive: 80, set: 55, speed: 75, jump: 80, stamina: 85, technique: 85, mental: 85 },
        position: 3
      },
      {
        id: "aoba-4",
        name: "Matsukawa Issei",
        stats: { attack: 75, block: 85, serve: 70, receive: 65, set: 50, speed: 65, jump: 80, stamina: 75, technique: 75, mental: 75 },
        position: 4
      },
      {
        id: "aoba-5",
        name: "Hanamaki Takahiro",
        stats: { attack: 80, block: 70, serve: 75, receive: 70, set: 55, speed: 70, jump: 75, stamina: 80, technique: 75, mental: 75 },
        position: 5
      },
      {
        id: "aoba-6",
        name: "Kunimi Akira",
        stats: { attack: 65, block: 60, serve: 70, receive: 75, set: 60, speed: 75, jump: 65, stamina: 85, technique: 80, mental: 80 },
        position: 6
      },
      {
        id: "aoba-7",
        name: "Kindaichi Yutaro",
        stats: { attack: 78, block: 80, serve: 65, receive: 60, set: 45, speed: 65, jump: 85, stamina: 75, technique: 70, mental: 70 },
        position: 7
      }
    ];
  }
  
  return {
    name: teamName,
    players,
    score: 0,
    serving: isHome
  };
};

const VolleyballGame: React.FC = () => {
  const [homeTeam, setHomeTeam] = useState<Team>(createSampleTeam("Karasuno", true));
  const [awayTeam, setAwayTeam] = useState<Team>(createSampleTeam("Aoba Johsai", false));
  const [gameLog, setGameLog] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rally, setRally] = useState(0);

  // Get players currently on court (positions 1-6)
  const getPlayersOnCourt = (team: Team): Player[] => {
    return team.players.filter(p => p.position >= 1 && p.position <= 6).sort((a, b) => a.position - b.position);
  };

  // Rotate team positions
  const rotateTeam = (team: Team): Team => {
    const updatedPlayers = team.players.map(player => {
      if (player.position >= 1 && player.position <= 6) {
        return { ...player, position: player.position === 6 ? 1 : player.position + 1 };
      }
      return player;
    });
    return { ...team, players: updatedPlayers };
  };

  // Calculate success probability based on relevant stats
  const calculateSuccessProbability = (player: Player, action: string, opponent?: Player): number => {
    let baseProb = 0;
    let relevantStats: number[] = [];

    switch (action) {
      case 'serve':
        relevantStats = [player.stats.serve, player.stats.technique, player.stats.mental];
        baseProb = 0.7;
        break;
      case 'receive':
        relevantStats = [player.stats.receive, player.stats.speed, player.stats.technique];
        baseProb = 0.75;
        break;
      case 'set':
        relevantStats = [player.stats.set, player.stats.technique, player.stats.mental];
        baseProb = 0.8;
        break;
      case 'attack':
        relevantStats = [player.stats.attack, player.stats.jump, player.stats.technique];
        if (opponent) {
          // Factor in opponent's blocking ability
          const blockFactor = (opponent.stats.block + opponent.stats.jump) / 200;
          baseProb = 0.6 - (blockFactor * 0.2);
        } else {
          baseProb = 0.65;
        }
        break;
      case 'block':
        relevantStats = [player.stats.block, player.stats.jump, player.stats.technique];
        baseProb = 0.4;
        break;
      case 'dig':
        relevantStats = [player.stats.receive, player.stats.speed, player.stats.mental];
        baseProb = 0.6;
        break;
      default:
        return 0.5;
    }

    // Calculate average of relevant stats (0-99) and convert to probability modifier
    const avgStat = relevantStats.reduce((sum, stat) => sum + stat, 0) / relevantStats.length;
    const statModifier = (avgStat - 50) / 100; // -0.5 to +0.49 modifier

    // Apply stamina factor (affects performance as game progresses)
    const staminaFactor = Math.max(0.7, player.stats.stamina / 100);
    
    return Math.max(0.1, Math.min(0.95, (baseProb + statModifier) * staminaFactor));
  };

  // Simulate a single action
  const simulateAction = (probability: number): boolean => {
    return Math.random() < probability;
  };

  // Find best player for specific action with position logic
  const findBestPlayerForAction = (team: Team, action: string, excludePlayer?: Player): Player => {
    const playersOnCourt = getPlayersOnCourt(team).filter(p => p.id !== excludePlayer?.id);
    
    // Position-based selection for certain actions
    if (action === 'set') {
      // Always prefer the actual setter (highest set stat)
      const setter = playersOnCourt.reduce((best, current) => 
        current.stats.set > best.stats.set ? current : best
      );
      return setter;
    }
    
    if (action === 'receive' || action === 'dig') {
      // Prefer libero or players with high receive stats
      const defender = playersOnCourt.reduce((best, current) => {
        // Bonus for libero-like stats (high receive, low attack)
        const currentScore = current.stats.receive + (current.stats.receive > 85 && current.stats.attack < 50 ? 20 : 0);
        const bestScore = best.stats.receive + (best.stats.receive > 85 && best.stats.attack < 50 ? 20 : 0);
        return currentScore > bestScore ? current : best;
      });
      return defender;
    }
    
    if (action === 'attack') {
      // Prefer players with high attack stats
      return playersOnCourt.reduce((best, current) => 
        current.stats.attack > best.stats.attack ? current : best
      );
    }
    
    if (action === 'block') {
      // Prefer middle blockers and tall players
      return playersOnCourt.reduce((best, current) => {
        const currentScore = current.stats.block + current.stats.jump * 0.5;
        const bestScore = best.stats.block + best.stats.jump * 0.5;
        return currentScore > bestScore ? current : best;
      });
    }
    
    // Default: best overall for the action
    return playersOnCourt.reduce((best, current) => {
      const currentProb = calculateSuccessProbability(current, action);
      const bestProb = calculateSuccessProbability(best, action);
      return currentProb > bestProb ? current : best;
    });
  };

  // Simulate a volleyball rally - continues until point is scored
  const simulateRally = (): { winner: 'home' | 'away', log: string[] } => {
    const log: string[] = [];
    let currentAttackingTeam = homeTeam.serving ? homeTeam : awayTeam;
    let currentDefendingTeam = homeTeam.serving ? awayTeam : homeTeam;
    let rallyCount = 0;
    let lastPlayerTouch: Player | undefined;
    const maxRallies = 20; // Prevent infinite loops
    
    // 1. Initial Serve
    const server = getPlayersOnCourt(currentAttackingTeam)[0]; // Position 1 serves
    const serveProb = calculateSuccessProbability(server, 'serve');
    const serveSuccess = simulateAction(serveProb);
    lastPlayerTouch = server;
    
    log.push(`${server.name} serves (${(serveProb * 100).toFixed(1)}% chance)`);
    
    if (!serveSuccess) {
      // Service error - immediate point (no foot faults)
      const errorType = Math.random();
      if (errorType < 0.6) {
        log.push(`❌ Service error - ball hits the net! Point to ${currentDefendingTeam.name}`);
      } else {
        log.push(`❌ Service error - serve goes out! Point to ${currentDefendingTeam.name}`);
      }
      return { winner: homeTeam.serving ? 'away' : 'home', log };
    }
    
    log.push(`✅ Good serve!`);
    
    // Main rally loop - continues until someone wins the point
    while (rallyCount < maxRallies) {
      rallyCount++;
      
      // 2. Receive/Dig (exclude last player who touched)
      const receiver = findBestPlayerForAction(currentDefendingTeam, rallyCount === 1 ? 'receive' : 'dig', lastPlayerTouch);
      const receiveProb = calculateSuccessProbability(receiver, 'receive');
      const receiveSuccess = simulateAction(receiveProb);
      lastPlayerTouch = receiver;
      
      const actionName = rallyCount === 1 ? 'receives' : 'digs';
      log.push(`${receiver.name} ${actionName} (${(receiveProb * 100).toFixed(1)}% chance)`);
      
      if (!receiveSuccess) {
        const errorType = Math.random();
        if (errorType < 0.7) {
          log.push(`❌ ${actionName === 'receives' ? 'Reception' : 'Dig'} error - ball hits the ground! Point to ${currentAttackingTeam.name}`);
        } else {
          log.push(`❌ ${actionName === 'receives' ? 'Reception' : 'Dig'} error - ball shanked out of bounds! Point to ${currentAttackingTeam.name}`);
        }
        return { winner: currentAttackingTeam === homeTeam ? 'home' : 'away', log };
      }
      
      log.push(`✅ Good ${actionName}!`);
      
      // 3. Set (exclude receiver, always use actual setter)
      const setter = findBestPlayerForAction(currentDefendingTeam, 'set', lastPlayerTouch);
      const setProb = calculateSuccessProbability(setter, 'set');
      const setSuccess = simulateAction(setProb);
      lastPlayerTouch = setter;
      
      log.push(`${setter.name} sets (${(setProb * 100).toFixed(1)}% chance)`);
      
      if (!setSuccess) {
        const errorType = Math.random();
        if (errorType < 0.3) {
          log.push(`❌ Setting error - double contact! Point to ${currentAttackingTeam.name}`);
        } else if (errorType < 0.6) {
          log.push(`❌ Setting error - ball goes into the net! Point to ${currentAttackingTeam.name}`);
        } else {
          log.push(`❌ Setting error - overpass out of bounds! Point to ${currentAttackingTeam.name}`);
        }
        return { winner: currentAttackingTeam === homeTeam ? 'home' : 'away', log };
      }
      
      log.push(`✅ Good set!`);
      
      // 4. Attack vs Block/Defense (attacker can't be setter)
      const attacker = findBestPlayerForAction(currentDefendingTeam, 'attack', lastPlayerTouch);
      const blocker = findBestPlayerForAction(currentAttackingTeam, 'block');
      lastPlayerTouch = attacker;
      
      const attackProb = calculateSuccessProbability(attacker, 'attack', blocker);
      const blockProb = calculateSuccessProbability(blocker, 'block');
      
      log.push(`${attacker.name} attacks vs ${blocker.name} blocking`);
      
      const attackSuccess = simulateAction(attackProb);
      const blockSuccess = simulateAction(blockProb);
      
      // Determine attack outcome
      if (blockSuccess) {
        // Successful block
        const blockType = Math.random();
        if (blockType < 0.4) {
          log.push(`🛡️ Block kill! ${blocker.name} stuff blocks! Point to ${currentAttackingTeam.name}`);
          return { winner: currentAttackingTeam === homeTeam ? 'home' : 'away', log };
        } else {
          // Block touch - random possession
          const blockTouchPossession = Math.random();
          if (blockTouchPossession < 0.6) {
            log.push(`🛡️ Block touch by ${blocker.name} - ball goes back to ${currentDefendingTeam.name}!`);
            // Ball goes back to attacking team (they keep possession)
            lastPlayerTouch = blocker; // Blocker touched it last
            continue;
          } else {
            log.push(`🛡️ Block touch by ${blocker.name} - ball deflected to ${currentAttackingTeam.name}!`);
            // Ball goes to defending team (switch possession)
            [currentAttackingTeam, currentDefendingTeam] = [currentDefendingTeam, currentAttackingTeam];
            lastPlayerTouch = blocker;
            continue;
          }
        }
      } else if (attackSuccess) {
        // Attack succeeds vs block
        const attackType = Math.random();
        if (attackType < 0.75) {
          log.push(`⚡ Kill! ${attacker.name} puts it down! Point to ${currentDefendingTeam.name}`);
          return { winner: currentDefendingTeam === homeTeam ? 'home' : 'away', log };
        } else {
          log.push(`💥 Hard spike by ${attacker.name} - somehow kept alive!`);
          // Attack was hard but defended, switch sides
          [currentAttackingTeam, currentDefendingTeam] = [currentDefendingTeam, currentAttackingTeam];
          lastPlayerTouch = attacker;
          continue;
        }
      } else {
        // Attack fails
        const errorType = Math.random();
        if (errorType < 0.4) {
          log.push(`❌ Attack error - ${attacker.name} hits it into the net! Point to ${currentAttackingTeam.name}`);
        } else if (errorType < 0.8) {
          log.push(`❌ Attack error - ${attacker.name} hits it out of bounds! Point to ${currentAttackingTeam.name}`);
        } else {
          log.push(`❌ Attack error - ${attacker.name} hits it wide! Point to ${currentAttackingTeam.name}`);
        }
        return { winner: currentAttackingTeam === homeTeam ? 'home' : 'away', log };
      }
    }
    
    // Fallback if max rallies reached
    const winner = Math.random() < 0.5 ? 'home' : 'away';
    log.push(`🏐 Epic ${maxRallies}-exchange rally ends! Point to ${winner === 'home' ? homeTeam.name : awayTeam.name}`);
    return { winner, log };
  };

  // Play a point
  const playPoint = () => {
    const result = simulateRally();
    
    // Update score
    if (result.winner === 'home') {
      setHomeTeam(prev => ({ ...prev, score: prev.score + 1 }));
      if (!homeTeam.serving) {
        // Home team wins serve
        setHomeTeam(prev => ({ ...prev, serving: true }));
        setAwayTeam(prev => ({ ...prev, serving: false }));
        // Rotate home team
        setHomeTeam(prev => rotateTeam(prev));
      }
    } else {
      setAwayTeam(prev => ({ ...prev, score: prev.score + 1 }));
      if (!awayTeam.serving) {
        // Away team wins serve
        setAwayTeam(prev => ({ ...prev, serving: true }));
        setHomeTeam(prev => ({ ...prev, serving: false }));
        // Rotate away team
        setAwayTeam(prev => rotateTeam(prev));
      }
    }
    
    // Update game log
    setGameLog(prev => [...prev, ...result.log, `Score: ${homeTeam.name} ${result.winner === 'home' ? homeTeam.score + 1 : homeTeam.score} - ${awayTeam.name} ${result.winner === 'away' ? awayTeam.score + 1 : awayTeam.score}`, '---']);
    setRally(prev => prev + 1);
    
    // Console log for debugging
    console.log('Rally', rally + 1, 'Result:', result);
  };

  // Auto-play simulation
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        playPoint();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, homeTeam, awayTeam, rally]);

  const resetGame = () => {
    setHomeTeam(createSampleTeam("Karasuno", true));
    setAwayTeam(createSampleTeam("Aoba Johsai", false));
    setGameLog([]);
    setRally(0);
    setIsPlaying(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-600">Haikyuu!! Volleyball Simulator</h1>
        
        {/* Score Display */}
        <div className="flex justify-center items-center mb-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold">{homeTeam.name}</h2>
            <div className={`text-4xl font-bold ${homeTeam.serving ? 'text-green-600' : 'text-gray-600'}`}>
              {homeTeam.score}
              {homeTeam.serving && <span className="text-sm ml-2">🏐</span>}
            </div>
          </div>
          <div className="mx-8 text-2xl font-bold text-gray-400">VS</div>
          <div className="text-center">
            <h2 className="text-xl font-semibold">{awayTeam.name}</h2>
            <div className={`text-4xl font-bold ${awayTeam.serving ? 'text-green-600' : 'text-gray-600'}`}>
              {awayTeam.score}
              {awayTeam.serving && <span className="text-sm ml-2">🏐</span>}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={playPoint}
            disabled={isPlaying}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Play Point
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? 'Pause' : 'Auto Play'}
          </button>
          <button
            onClick={resetGame}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
          >
            <RotateCcw size={16} />
            Reset Game
          </button>
        </div>

        {/* Team Lineups */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">{homeTeam.name} (On Court)</h3>
            <div className="space-y-2">
              {getPlayersOnCourt(homeTeam).map(player => (
                <div key={player.id} className="bg-blue-50 p-2 rounded">
                  <div className="font-medium">Pos {player.position}: {player.name}</div>
                  <div className="text-sm text-gray-600">
                    ATK:{player.stats.attack} BLK:{player.stats.block} SRV:{player.stats.serve} REC:{player.stats.receive} SET:{player.stats.set}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">{awayTeam.name} (On Court)</h3>
            <div className="space-y-2">
              {getPlayersOnCourt(awayTeam).map(player => (
                <div key={player.id} className="bg-red-50 p-2 rounded">
                  <div className="font-medium">Pos {player.position}: {player.name}</div>
                  <div className="text-sm text-gray-600">
                    ATK:{player.stats.attack} BLK:{player.stats.block} SRV:{player.stats.serve} REC:{player.stats.receive} SET:{player.stats.set}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Game Log */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Game Log</h3>
        <div className="bg-gray-50 p-4 rounded-lg h-96 overflow-y-auto">
          {gameLog.length === 0 ? (
            <p className="text-gray-500 text-center">No plays yet. Click "Play Point" to start!</p>
          ) : (
            <div className="space-y-1">
              {gameLog.map((entry, index) => (
                <div
                  key={index}
                  className={`text-sm ${
                    entry.startsWith('❌') ? 'text-red-600' :
                    entry.startsWith('✅') ? 'text-green-600' :
                    entry.startsWith('🛡️') || entry.startsWith('⚡') ? 'text-blue-600 font-semibold' :
                    entry.startsWith('Score:') ? 'font-semibold text-purple-600' :
                    entry === '---' ? 'border-b border-gray-300 my-2' :
                    'text-gray-700'
                  }`}
                >
                  {entry === '---' ? '' : entry}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolleyballGame;